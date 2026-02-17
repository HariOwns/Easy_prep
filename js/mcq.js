let startTime;

// PREVENT BACK / RELOAD
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.pushState(null, null, window.location.href);
  alert("⚠️ Test in progress. You cannot go back.");
};

// PREVENT TAB CLOSE / RELOAD
window.addEventListener("beforeunload", function (e) {
  if (!testSubmitted) {
    e.preventDefault();
    e.returnValue = "Test in progress. Are you sure?";
  }
});


/************************
 * LOAD TEST CONFIG
 ************************/
const testConfig = JSON.parse(localStorage.getItem("testConfig"));

if (!testConfig) {
  alert("Test configuration missing!");
  window.location.href = "dashboard.html";
}

const totalQuestions = testConfig.questions;
const totalTime = testConfig.duration * 60;
const examGroup = testConfig.group;

/************************
 * DOM REFERENCES
 ************************/
const questionText = document.getElementById("questionText");
const optionsDiv = document.getElementById("options");
const qNo = document.getElementById("qNo");
const qCounter = document.getElementById("qCounter");
const timerEl = document.getElementById("timer");

const answeredCountEl = document.getElementById("answeredCount");
const totalCountEl = document.getElementById("totalCount");
const progressFill = document.getElementById("progressFill");

const palette = document.getElementById("palette");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const timeUpModal = document.getElementById("timeUpModal");

/************************
 * INIT STATE
 ************************/
totalCountEl.innerText = totalQuestions;

let current = 0;
let answers = Array(totalQuestions).fill(null);
let timeLeft = totalTime;
let testSubmitted = false;

/************************
 * LOAD QUESTIONS FROM JSON
 ************************/

let questions = [];

async function loadQuestions() {

  let fileName = "";

  if (examGroup === "Group 1") fileName = "data/group1.json";
  else if (examGroup === "Group 2") fileName = "data/group2.json";
  else if (examGroup === "Group 2A") fileName = "data/group2a.json";
  else if (examGroup === "Group 4") fileName = "data/group4.json";

  try {
    const res = await fetch(fileName);
    const data = await res.json();

    // Shuffle full question bank
    const shuffled = [...data.questions].sort(() => 0.5 - Math.random());

    // Pick only selected number
    const selected = shuffled.slice(0, totalQuestions);

    // Convert to your MCQ format
    questions = selected.map(q => ({
      q: q.question,
      options: q.options,
      answer: q.correctIndex,
      explanation: q.explanation
    }));
    
    startTime = Date.now();

    renderQuestion();
    updateUI();

  } catch (err) {
    alert("Error loading questions");
    console.error(err);
  }
}


/************************
 * TIMER (AUTO SUBMIT)
 ************************/
const timeWarning = document.getElementById("timeWarning");
let warningShown = false;

const timerInterval = setInterval(() => {
  if (testSubmitted) return;

  timeLeft--;

  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  timerEl.innerText = `${min}:${sec.toString().padStart(2, "0")}`;

  // 🔥 TIMER TURNS RED + BLINKS (< 3 MIN)
  if (timeLeft <= 180) {
    timerEl.classList.add("timer-warning");
  }

  // 🔔 3-MIN WARNING MESSAGE (ONCE)
  if (timeLeft === 180 && !warningShown) {
    warningShown = true;
    timeWarning.style.display = "block";

    setTimeout(() => {
      timeWarning.style.display = "none";
    }, 5000);
  }

  // ⏰ TIME UP
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    timerEl.classList.remove("timer-warning"); // stop blink
    showTimeUpModal();
  }
}, 1000);

/************************
 * SHOW TIME UP MODAL
 ************************/
function showTimeUpModal() {
  testSubmitted = true;

  // Disable UI
  nextBtn.style.display = "none";
  submitBtn.style.display = "none";
  optionsDiv.style.pointerEvents = "none";

  // Show modal
  timeUpModal.style.display = "flex";

  // Auto submit after 2.5 sec
  setTimeout(() => {
    submitTest(true);
  }, 2500);
}
// ENSURE MODAL IS HIDDEN ON LOAD
timeUpModal.style.display = "none";

/************************
 * RENDER QUESTION
 ************************/
function renderQuestion() {
  qNo.innerText = current + 1;
  qCounter.innerText = `Question ${current + 1} of ${totalQuestions}`;
  if (!questions[current]) return;
  questionText.innerText = questions[current].q;


  optionsDiv.innerHTML = "";

  questions[current].options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;

    if (answers[current] === i) btn.classList.add("selected");

    btn.onclick = () => {
      if (testSubmitted) return;
      answers[current] = i;
      updateUI();
      renderQuestion();
    };

    optionsDiv.appendChild(btn);
  });
}

/************************
 * UPDATE UI (PALETTE + PROGRESS)
 ************************/
function updateUI() {
  palette.innerHTML = "";

  answers.forEach((a, i) => {
    const pBtn = document.createElement("button");

    if (i === current) pBtn.className = "current";
    else if (a !== null) pBtn.className = "answered";
    else pBtn.className = "not";

    pBtn.innerText = i + 1;
    pBtn.onclick = () => {
      if (testSubmitted) return;
      current = i;
      renderQuestion();
      updateUI();
    };

    palette.appendChild(pBtn);
  });

  const answered = answers.filter(a => a !== null).length;
  answeredCountEl.innerText = answered;

  progressFill.style.width =
    `${(answered / totalQuestions) * 100}%`;

  const allAnswered = answered === totalQuestions;
  const isLast = current === totalQuestions - 1;

  nextBtn.style.display = (!isLast && !allAnswered) ? "inline-block" : "none";
  submitBtn.style.display = (isLast || allAnswered) ? "inline-block" : "inline-block";
}

/************************
 * NAVIGATION
 ************************/
function nextQuestion() {
  if (current < totalQuestions - 1) {
    current++;
    renderQuestion();
    updateUI();
  }
}

function prevQuestion() {
  if (current > 0) {
    current--;
    renderQuestion();
    updateUI();
  }
}

/************************
 * SUBMIT TEST
 ************************/
function submitTest(auto = false) {

  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - startTime) / 1000);

  let correct = 0;

  answers.forEach((ans, i) => {
    if (ans === questions[i].answer) correct++;
  });

  localStorage.setItem("lastResult", JSON.stringify({
    total: totalQuestions,
    correct,
    answers,
    answersData: questions,
    group: examGroup,
    duration: testConfig.duration,
    autoSubmitted: auto,
    timeTaken: timeTaken
  }));

  // 🔥 FULL SCREEN WITH SLIDE ANIMATION
  document.body.innerHTML = `
    <div id="processingScreen" style="
      height:100vh;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      background:linear-gradient(135deg,#0f172a,#1e293b);
      color:white;
      font-family:sans-serif;
      text-align:center;
      overflow:hidden;
    ">

      <div id="icon" style="
        font-size:60px;
        margin-bottom:20px;
        animation: float 2s ease-in-out infinite;
      ">🧠</div>

      <h1 id="title" style="
        transform:translateY(40px);
        opacity:0;
        animation: slideUp 0.8s forwards;
      ">
        Analyzing Your Performance...
      </h1>

      <p style="opacity:0.7;margin-top:10px;">
        Checking answers...
      </p>

      <div style="
        width:300px;
        height:6px;
        background:#334155;
        border-radius:10px;
        margin-top:25px;
        overflow:hidden;
      ">
        <div id="progressBar" style="
          width:0%;
          height:100%;
          background:#22c55e;
          transition:width 1s linear;
        "></div>
      </div>

      <p id="countdownText" style="margin-top:15px;font-size:18px;"></p>

    </div>

    <style>
      @keyframes slideUp {
        to {
          transform:translateY(0);
          opacity:1;
        }
      }

      @keyframes float {
        0%,100% { transform:translateY(0); }
        50% { transform:translateY(-10px); }
      }
    </style>
  `;

  let delay = Math.floor(Math.random() * 11) + 15;
  let totalDelay = delay;

  const countdown = document.getElementById("countdownText");
  const progressBar = document.getElementById("progressBar");

  countdown.innerText = `Processing... ${delay}s`;

  const interval = setInterval(() => {

    delay--;

    const percent = ((totalDelay - delay) / totalDelay) * 100;
    progressBar.style.width = percent + "%";

    countdown.innerText = `Processing... ${delay}s`;

    if (delay <= 0) {
      clearInterval(interval);
      window.location.href = "result.html";
    }

  }, 1000);
}

/************************
 * INIT
 ************************/
loadQuestions();

