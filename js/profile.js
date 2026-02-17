const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser");
const allHistory = JSON.parse(localStorage.getItem("testHistory")) || {};
const history = allHistory[currentUser] || [];

if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";
}

const user = users[currentUser];

const totalTests = history.length;

let totalCorrect = 0;
let totalQuestions = 0;
let totalPercent = 0;
let bestScore = 0;

history.forEach(test => {
  const correct = Number(test.correct) || 0;
  const total = Number(test.total) || 0;
  const percent = Number(test.percent) || 0;

  totalCorrect += correct;
  totalQuestions += total;
  totalPercent += percent;

  if (percent > bestScore) {
    bestScore = percent;
  }
});

const average = totalTests > 0
  ? Math.round(totalPercent / totalTests)
  : 0;

const accuracy = totalQuestions > 0
  ? Math.round((totalCorrect / totalQuestions) * 100)
  : 0;

document.getElementById("totalTests").innerText = totalTests;
document.getElementById("bestScore").innerText = bestScore + "%";
document.getElementById("average").innerText = average + "%";
document.getElementById("accuracy").innerText = accuracy + "%";

document.getElementById("userName").innerText = user.name;
document.getElementById("userMobile").innerText = user.mobile || currentUser;
document.getElementById("username").innerText = user.mobile || currentUser;
document.getElementById("userExam").innerText = user.exam;

const date = user.createdAt
  ? new Date(user.createdAt)
  : null;

document.getElementById("memberSince").innerText =
  date
    ? date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : "Not available";

function goBack() {
  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}
