document.addEventListener("DOMContentLoaded", function () {

  /* ========= AUTH CHECK ========= */

  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  /* ========= GET USER GROUP ========= */

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const userData = users[currentUser];

  let group = "Group 1"; // default

  if (userData && userData.exam) {
    group = userData.exam;
  }

  document.getElementById("groupTitle").textContent = group;

  /* ========= GET TYPE ========= */

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  loadSection(type, group);
});


/* ========= LOAD SECTION ========= */

function loadSection(type, group) {

  const intro = document.getElementById("sectionIntro");
  const container = document.getElementById("cardsContainer");
  const title = document.getElementById("pageTitle");

  container.innerHTML = "";
  intro.innerHTML = "";

  if (type === "community") {

    title.textContent = "Community Support";

    intro.innerHTML = `
      <div class="intro-box purple">
        <i class="ri-group-line"></i>
        <div>
          <h3>Join Our Community</h3>
          <p>Connect with thousands of ${group} aspirants.</p>
        </div>
      </div>
    `;

    createCard(container, "ri-telegram-line", "blue",
      `${group} Aspirants Telegram`,
      "Join discussion group",
      "Telegram",
      "https://t.me/");

    createCard(container, "ri-whatsapp-line", "green",
      `${group} Doubt Clearing WhatsApp`,
      "Mentor guidance group",
      "WhatsApp",
      "https://wa.me/");

    createCard(container, "ri-discord-line", "purple",
      `${group} Study Discord`,
      "Study circle",
      "Discord",
      "https://discord.com/");

    createCard(container, "ri-question-line", "orange",
      "Submit Doubts (Google Form)",
      "Get answers in 24 hours",
      "Form",
      "https://forms.google.com/");
  }

  else if (type === "news") {

    title.textContent = "Latest News";

    intro.innerHTML = `
      <div class="intro-box orange">
        <i class="ri-notification-3-line"></i>
        <div>
          <h3>Stay Updated</h3>
          <p>Latest notifications & updates for ${group}</p>
        </div>
      </div>
    `;

    createCard(container, "ri-file-text-line", "blue",
      `${group} Notification`,
      "Official TNPSC notice",
      "Notification",
      "https://www.tnpsc.gov.in/Notifications.aspx");

    createCard(container, "ri-calendar-line", "green",
      `${group} Hall Ticket`,
      "Download admit card",
      "Hall Ticket",
      "https://apply.tnpscexams.in/");

    createCard(container, "ri-award-line", "purple",
      `${group} Results`,
      "Check results",
      "Result",
      "https://www.tnpsc.gov.in/Results.aspx");
  }

  else if (type === "videos") {

    title.textContent = "Tamil Video Lectures";

    intro.innerHTML = `
      <div class="intro-box red">
        <i class="ri-youtube-line"></i>
        <div>
          <h3>YouTube Resources</h3>
          <p>Learn ${group} subjects in Tamil.</p>
        </div>
      </div>
    `;

    createVideo(container,
      `${group} General Science Tamil`,
      "Physics, Chemistry, Biology",
      `https://www.youtube.com/results?search_query=TNPSC+${group}+Science+Tamil`);

    createVideo(container,
      `${group} Current Affairs Tamil`,
      "Latest updates",
      `https://www.youtube.com/results?search_query=TNPSC+${group}+Current+Affairs+Tamil`);
  }

  else {
    title.textContent = "Extras";
    container.innerHTML = "<p style='padding:20px;'>Invalid section.</p>";
  }
}


/* ========= CARD ========= */

function createCard(container, icon, color, title, desc, tag, link) {

  container.innerHTML += `
    <div class="card" onclick="window.open('${link}','_blank')">
      <div class="icon-box ${color}">
        <i class="${icon}"></i>
      </div>
      <div class="card-content">
        <h3>${title}</h3>
        <p>${desc}</p>
        <span class="tag">${tag}</span>
      </div>
      <i class="ri-external-link-line external"></i>
    </div>
  `;
}


/* ========= VIDEO CARD ========= */

function createVideo(container, title, desc, link) {

  container.innerHTML += `
    <div class="video-card" onclick="window.open('${link}','_blank')">
      <div class="video-top">
        <i class="ri-video-line"></i>
      </div>
      <div class="video-body">
        <h3>${title}</h3>
        <p>${desc}</p>
        <i class="ri-external-link-line external"></i>
      </div>
    </div>
  `;
}


/* ========= BACK ========= */

function goBack() {
  window.history.back();
}
