// AUTH CHECK
const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";
}

const user = users[currentUser];

// SHOW GROUP AUTO
document.getElementById("examGroup").innerText = user.exam;

let selectedConfig = null;

// SELECT DURATION
function selectDuration(card, minutes) {
  document.querySelectorAll(".duration-card").forEach(c =>
    c.classList.remove("active")
  );

  card.classList.add("active");

  let questions = 15;
  if (minutes === 25) questions = 25;
  else if (minutes === 45) questions = 50;
  else if (minutes === 60) questions = 100;

  selectedConfig = {
    duration: minutes,
    questions: questions,
    group: user.exam
  };

  const btn = document.getElementById("startBtn");
  btn.disabled = false;
  btn.classList.add("active");
  btn.innerText = `Start Test (${minutes} Minutes)`;
}

// START TEST
function startTest() {
  if (!selectedConfig) {
    alert("Please select test duration");
    return;
  }

  // ✅ SAVE CONFIG
  localStorage.setItem("testConfig", JSON.stringify(selectedConfig));

  // GO TO MCQ
  window.location.href = "mcq.html";
}

// BACK TO DASHBOARD
function goBack() {
  window.location.href = "dashboard.html";
}
