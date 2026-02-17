const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser");
const allHistory = JSON.parse(localStorage.getItem("testHistory")) || {};
const history = allHistory[currentUser] || [];

if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";
}

const user = users[currentUser];

document.getElementById("userName").innerText = user.name;
document.getElementById("examName").innerText = user.exam;

const testsTaken = history.length;

let totalCorrect = 0;
let totalQuestions = 0;
let bestScore = 0;

history.forEach(test => {
  totalCorrect += Number(test.correct) || 0;
  totalQuestions += Number(test.total) || 0;

  if ((Number(test.percent) || 0) > bestScore) {
    bestScore = Number(test.percent) || 0;
  }
});

const accuracy = totalQuestions > 0
  ? Math.round((totalCorrect / totalQuestions) * 100)
  : 0;

document.getElementById("testsTaken").innerText = testsTaken;
document.getElementById("bestScore").innerText = bestScore + "%";
document.getElementById("accuracy").innerText = accuracy + "%";
document.getElementById("correctAnswers").innerText = totalCorrect;

const progressPercent = Math.min((testsTaken / 10) * 100, 100);
document.getElementById("progressFill").style.width = progressPercent + "%";
document.getElementById("progressLabel").innerText =
  `${testsTaken} of 10 tests completed`;

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function goToTestSetup() {
  window.location.href = "test-setup.html";
}

function goToProfile() {
  window.location.href = "profile.html";
}

function goToMaterials() {
  window.location.href = "study-materials.html";
}

function openExtras(type) {
  const selectedGroup = localStorage.getItem("selectedGroup") || "Group 1";
  window.location.href =
    `extras.html?type=${type}&group=${selectedGroup}`;
}
