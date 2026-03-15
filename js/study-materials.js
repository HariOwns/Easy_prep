// AUTH CHECK
const users = JSON.parse(localStorage.getItem("users")) || {};
const currentUser = localStorage.getItem("currentUser");

if (!currentUser || !users[currentUser]) {
  window.location.href = "index.html";
}

const user = users[currentUser];

// SET GROUP TEXT
document.getElementById("groupName").innerText = user.exam;

// MATERIAL DATA (GROUP-WISE)
const materialsByGroup = {

  "Group 1": [
  {
    title: "TNPSC Group 1 Syllabus (Official)",
    desc: "Official syllabus page from TNPSC website",
    tag: "Syllabus",
    icon: "ri-file-text-line",
    link: "https://tnpsc.gov.in/english/syllabus.html"
  },
  {
    title: "TNPSC Group 1 Syllabus PDF",
    desc: "Official TNPSC Group 1 detailed syllabus PDF",
    tag: "PDF",
    icon: "ri-file-download-line",
    link: "https://www.tnpsc.gov.in/static_pdf/Syllabus/Gr_I_09_03_2020.pdf"
  },
  {
    title: "Indian Polity",
    desc: "Constitution, governance & polity notes",
    tag: "Polity",
    icon: "ri-book-open-line",
    link: "https://www.insightsonindia.com/polity/"
  },
  {
    title: "Indian Economy",
    desc: "Economic concepts and current economy",
    tag: "Economy",
    icon: "ri-line-chart-line",
    link: "https://www.insightsonindia.com/indian-economy/"
  },
  {
    title: "Modern Indian History",
    desc: "Freedom struggle & modern India",
    tag: "History",
    icon: "ri-book-line",
    link: "https://www.insightsonindia.com/modern-indian-history/"
  },
  {
    title: "Geography of India",
    desc: "Physical, economic & human geography",
    tag: "Geography",
    icon: "ri-earth-line",
    link: "https://www.insightsonindia.com/geography/"
  },
  {
    title: "Current Affairs",
    desc: "Daily & monthly current affairs",
    tag: "CA",
    icon: "ri-newspaper-line",
    link: "https://www.insightsonindia.com/current-affairs-upsc/"
  }
],

  "Group 2": [
  {
    title: "TNPSC Group 2 Syllabus (Official)",
    desc: "Official TNPSC syllabus page",
    tag: "Syllabus",
    icon: "ri-file-text-line",
    link: "https://tnpsc.gov.in/english/syllabus.html"
  },
  {
    title: "Tamil Nadu History & Culture",
    desc: "Tamil Nadu state board textbooks and history resources",
    tag: "TN History",
    icon: "ri-book-line",
    link: "https://tnschools.gov.in/tntextbooks/"
  },
  {
    title: "General Studies Preparation",
    desc: "Comprehensive GS topics for competitive exams",
    tag: "General Studies",
    icon: "ri-book-open-line",
    link: "https://www.insightsonindia.com/"
  },
  {
    title: "Indian Polity",
    desc: "Indian Constitution and governance topics",
    tag: "Polity",
    icon: "ri-government-line",
    link: "https://www.insightsonindia.com/polity/"
  },
  {
    title: "Indian Economy",
    desc: "Economic concepts for competitive exams",
    tag: "Economy",
    icon: "ri-line-chart-line",
    link: "https://www.insightsonindia.com/indian-economy/"
  },
  {
    title: "TNPSC Notifications & Updates",
    desc: "Latest TNPSC announcements and exam notifications",
    tag: "CA",
    icon: "ri-newspaper-line",
    link: "https://tnpsc.gov.in/english/notifications.html"
  },
  {
    title: "Aptitude & Mental Ability",
    desc: "Practice quantitative aptitude and reasoning questions",
    tag: "Aptitude",
    icon: "ri-brain-line",
    link: "https://www.indiabix.com/"
  }
],

"Group 2A": [
  {
    title: "TNPSC Group 2A Syllabus (Official)",
    desc: "Official TNPSC syllabus page",
    tag: "Syllabus",
    icon: "ri-file-text-line",
    link: "https://tnpsc.gov.in/english/syllabus.html"
  },
  {
    title: "Tamil Nadu History & Culture",
    desc: "Tamil Nadu state board textbooks and history resources",
    tag: "TN History",
    icon: "ri-book-line",
    link: "https://tnschools.gov.in/tntextbooks/"
  },
  {
    title: "General Studies Preparation",
    desc: "Comprehensive GS topics for competitive exams",
    tag: "General Studies",
    icon: "ri-book-open-line",
    link: "https://www.insightsonindia.com/"
  },
  {
    title: "Indian Polity",
    desc: "Indian Constitution and governance topics",
    tag: "Polity",
    icon: "ri-government-line",
    link: "https://www.insightsonindia.com/polity/"
  },
  {
    title: "Indian Economy",
    desc: "Economic concepts for competitive exams",
    tag: "Economy",
    icon: "ri-line-chart-line",
    link: "https://www.insightsonindia.com/indian-economy/"
  },
  {
    title: "Aptitude & Reasoning Practice",
    desc: "Quantitative aptitude and logical reasoning questions",
    tag: "Aptitude",
    icon: "ri-brain-line",
    link: "https://www.indiabix.com/"
  },
  {
    title: "TNPSC Notifications & Updates",
    desc: "Latest TNPSC announcements and exam updates",
    tag: "Current Affairs",
    icon: "ri-newspaper-line",
    link: "https://tnpsc.gov.in/english/notifications.html"
  }
],

  "Group 4": [
  {
    title: "TNPSC Group 4 Syllabus (Official)",
    desc: "Official TNPSC syllabus page",
    tag: "Syllabus",
    icon: "ri-file-text-line",
    link: "https://tnpsc.gov.in/english/syllabus.html"
  },
  {
    title: "Tamil Grammar & Samacheer Books",
    desc: "Tamil grammar and Tamil Nadu state board textbooks",
    tag: "Tamil",
    icon: "ri-book-2-line",
    link: "https://tnschools.gov.in/tntextbooks/"
  },
  {
    title: "General Science (NCERT Resources)",
    desc: "Basic science concepts for competitive exams",
    tag: "Science",
    icon: "ri-flask-line",
    link: "https://ncert.nic.in/textbook.php"
  },
  {
    title: "Indian Polity (Basics)",
    desc: "Indian Constitution and governance concepts",
    tag: "Polity",
    icon: "ri-government-line",
    link: "https://www.insightsonindia.com/polity/"
  },
  {
    title: "Indian Economy (Basics)",
    desc: "Economic fundamentals for competitive exams",
    tag: "Economy",
    icon: "ri-line-chart-line",
    link: "https://www.insightsonindia.com/indian-economy/"
  },
  {
    title: "TNPSC Notifications & Updates",
    desc: "Latest TNPSC announcements and exam notifications",
    tag: "CA",
    icon: "ri-newspaper-line",
    link: "https://tnpsc.gov.in/english/notifications.html"
  }
]
};


// RENDER MATERIALS
const grid = document.getElementById("materialsGrid");
const materials = materialsByGroup[user.exam] || [];

if (materials.length === 0) {
  grid.innerHTML = `<p>No materials available for this group.</p>`;
}

materials.forEach(item => {
  const card = document.createElement("div");
  card.className = "material-card";
  card.onclick = () => window.open(item.link, "_blank");

  card.innerHTML = `
    <div class="icon-box"><i class="${item.icon}"></i></div>
    <div class="content">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <span class="tag">${item.tag}</span>
    </div>
    <i class="ri-external-link-line external"></i>
  `;

  grid.appendChild(card);
});

// BACK BUTTON
function goBack() {
  window.location.href = "dashboard.html";
}
