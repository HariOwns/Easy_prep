document.addEventListener("DOMContentLoaded", async function () {

  const currentUser = localStorage.getItem("currentUser");

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  const userData = users[currentUser];

  if (!userData) {
    window.location.href = "index.html";
    return;
  }

  const group = userData.exam;
  document.getElementById("groupTitle").textContent = group;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");

  await loadSection(type, group);
});


async function loadSection(type, group) {

  const container = document.getElementById("cardsContainer");
  const intro = document.getElementById("sectionIntro");
  const title = document.getElementById("pageTitle");

  container.innerHTML = "";
  intro.innerHTML = "";

  try {
    const res = await fetch("data/extras-data.json");
    const data = await res.json();

    if (!data[group] || !data[group][type]) {
      container.innerHTML = "<p>No data available.</p>";
      return;
    }

    const items = data[group][type];

    title.textContent = `${group} ${type.toUpperCase()}`;

    items.forEach(item => {

      if (type === "videos") {
        createVideo(container, item.title, item.desc, item.link);
      } else {
        createCard(
          container,
          item.icon,
          item.color,
          item.title,
          item.desc,
          item.tag,
          item.link
        );
      }

    });

  } catch (err) {
    container.innerHTML = "<p>Error loading data.</p>";
    console.error(err);
  }
}


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


function goBack() {
  window.history.back();
}
