const result = JSON.parse(localStorage.getItem("lastResult"));
const currentUser = localStorage.getItem("currentUser");

if (!result || !currentUser) {
  window.location.href = "dashboard.html";
}

/* ===============================
   SAFETY CONVERSIONS
=============================== */
const correct = Number(result.correct) || 0;
const total = Number(result.total) || 0;
const timeTaken = Number(result.timeTaken) || 0;

const percent = total > 0
  ? Math.round((correct / total) * 100)
  : 0;

const incorrect = total - correct;

/* ===============================
   SCORE DISPLAY
=============================== */
document.getElementById("scorePercent").innerText = percent + "%";
document.getElementById("scoreProgress").style.width = percent + "%";
document.getElementById("correctCount").innerText = correct;
document.getElementById("incorrectCount").innerText = incorrect;

const min = Math.floor(timeTaken / 60);
const sec = timeTaken % 60;
document.getElementById("timeTaken").innerText = `${min}m ${sec}s`;

/* ===============================
   RESULT MESSAGE
=============================== */
if (percent >= 75) {
  document.getElementById("resultMessage").innerText = "Excellent Work!";
} else if (percent >= 40) {
  document.getElementById("resultMessage").innerText = "Good Attempt!";
} else {
  document.getElementById("resultMessage").innerText = "Keep Practicing!";
}

/* ===============================
   ANSWER REVIEW
=============================== */
const reviewList = document.getElementById("reviewList");

if (result.answers && result.answersData) {

  result.answers.forEach((userAnswerIndex, i) => {

    const questionData = result.answersData[i];
    if (!questionData) return;

    const correctIndex = questionData.answer;

    const item = document.createElement("div");
    item.className = "review-item";

    const userAnswerText =
      userAnswerIndex !== null
        ? questionData.options[userAnswerIndex]
        : "Not Answered";

    const correctAnswerText =
      questionData.options[correctIndex];

    if (userAnswerIndex === correctIndex) {
      item.classList.add("correct");
    } else {
      item.classList.add("incorrect");
    }

    item.innerHTML = `
      <h4>Q${i + 1}. ${questionData.q}</h4>
      <p><strong>Your Answer:</strong> ${userAnswerText}</p>
      <p><strong>Correct Answer:</strong> ${correctAnswerText}</p>
      <p><strong>Explanation:</strong> ${questionData.explanation || "No explanation available."}</p>
    `;

    reviewList.appendChild(item);
  });
}

/* ===============================
   SAVE HISTORY (ONLY ONCE)
=============================== */

let allHistory = JSON.parse(localStorage.getItem("testHistory")) || {};

if (!allHistory[currentUser]) {
  allHistory[currentUser] = [];
}

/* 🔥 Prevent duplicate save on refresh */
if (!result.savedToHistory) {

  allHistory[currentUser].push({
    date: new Date().toISOString(),
    group: result.group || "Unknown",
    correct: correct,
    total: total,
    percent: percent,
    timeTaken: timeTaken
  });

  localStorage.setItem("testHistory", JSON.stringify(allHistory));

  // mark as saved
  result.savedToHistory = true;
  localStorage.setItem("lastResult", JSON.stringify(result));
}

/* ===============================
   BUTTONS
=============================== */

function retakeTest(){
  window.location.href = "test-setup.html";
}

function goDashboard(){
  window.location.href = "dashboard.html";
}
