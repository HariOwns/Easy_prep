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
      desc: "Official syllabus from TNPSC website",
      tag: "Syllabus",
      icon: "ri-file-text-line",
      link: "https://www.tnpsc.gov.in/English/syllabus.aspx"
    },
    {
      title: "Indian Polity",
      desc: "Constitution, governance & polity notes",
      tag: "Polity",
      icon: "ri-book-open-line",
      link: "https://www.insightsonindia.com/indian-polity/"
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
      link: "https://www.insightsonindia.com/current-affairs/"
    }
  ],

  "Group 2": [
    {
      title: "TNPSC Group 2 Syllabus (Official)",
      desc: "Official syllabus from TNPSC website",
      tag: "Syllabus",
      icon: "ri-file-text-line",
      link: "https://www.tnpsc.gov.in/English/syllabus.aspx"
    },
    {
      title: "Tamil Nadu History & Culture",
      desc: "TN history from Sangam to modern era",
      tag: "TN History",
      icon: "ri-book-line",
      link: "https://tnschools.gov.in/tntextbooks/"
    },
    {
      title: "General Studies Notes",
      desc: "Comprehensive GS notes for Group 2",
      tag: "General Studies",
      icon: "ri-book-open-line",
      link: "https://www.insightsonindia.com/tnpsc/"
    },
    {
      title: "Indian Polity (TNPSC Focus)",
      desc: "Polity topics relevant for TNPSC",
      tag: "Polity",
      icon: "ri-government-line",
      link: "https://www.insightsonindia.com/indian-polity/"
    },
    {
      title: "Indian Economy Basics",
      desc: "Basic economy for competitive exams",
      tag: "Economy",
      icon: "ri-line-chart-line",
      link: "https://www.insightsonindia.com/indian-economy/"
    },
    {
      title: "Current Affairs – TNPSC",
      desc: "TNPSC-focused current affairs",
      tag: "CA",
      icon: "ri-newspaper-line",
      link: "https://www.tnpsc.gov.in/English/notifications.aspx"
    },
    {
      title: "Aptitude & Mental Ability",
      desc: "Quantitative aptitude & reasoning",
      tag: "Aptitude",
      icon: "ri-brain-line",
      link: "https://www.indiabix.com/"
    }
  ],

"Group 2A": [
  {
    title: "TNPSC Group 2A Syllabus (Official)",
    desc: "Official syllabus for TNPSC Group 2A",
    tag: "Syllabus",
    icon: "ri-file-text-line",
    link: "https://www.tnpsc.gov.in/English/syllabus.aspx"
  },
  {
    title: "Tamil Nadu History & Culture",
    desc: "TN history and culture for Group 2A",
    tag: "TN History",
    icon: "ri-book-line",
    link: "https://tnschools.gov.in/tntextbooks/"
  },
  {
    title: "General Studies (Group 2A)",
    desc: "General Studies notes tailored for Group 2A",
    tag: "General Studies",
    icon: "ri-book-open-line",
    link: "https://www.insightsonindia.com/tnpsc/"
  },
  {
    title: "Indian Polity (TNPSC)",
    desc: "Polity concepts for TNPSC exams",
    tag: "Polity",
    icon: "ri-government-line",
    link: "https://www.insightsonindia.com/indian-polity/"
  },
  {
    title: "Indian Economy (Basics)",
    desc: "Basic economy topics for competitive exams",
    tag: "Economy",
    icon: "ri-line-chart-line",
    link: "https://www.insightsonindia.com/indian-economy/"
  },
  {
    title: "Aptitude & Reasoning",
    desc: "Logical reasoning and aptitude practice",
    tag: "Aptitude",
    icon: "ri-brain-line",
    link: "https://www.indiabix.com/"
  },
  {
    title: "TNPSC Current Affairs",
    desc: "Latest TNPSC notifications & CA",
    tag: "Current Affairs",
    icon: "ri-newspaper-line",
    link: "https://www.tnpsc.gov.in/English/notifications.aspx"
  }
],

  "Group 4": [
    {
      title: "TNPSC Group 4 Syllabus (Official)",
      desc: "Official Group 4 syllabus",
      tag: "Syllabus",
      icon: "ri-file-text-line",
      link: "https://www.tnpsc.gov.in/English/syllabus.aspx"
    },
    {
      title: "Tamil Grammar",
      desc: "Tamil grammar for Group 4 exam",
      tag: "Tamil",
      icon: "ri-book-2-line",
      link: "https://tnschools.gov.in/tntextbooks/"
    },
    {
      title: "General Science",
      desc: "Basic science for Group 4",
      tag: "Science",
      icon: "ri-flask-line",
      link: "https://www.insightsonindia.com/general-science/"
    },
    {
      title: "Indian Polity (Basics)",
      desc: "Basic polity concepts",
      tag: "Polity",
      icon: "ri-government-line",
      link: "https://www.insightsonindia.com/indian-polity/"
    },
    {
      title: "Indian Economy (Basics)",
      desc: "Basic economy concepts",
      tag: "Economy",
      icon: "ri-line-chart-line",
      link: "https://www.insightsonindia.com/indian-economy/"
    },
    {
      title: "TN Current Affairs",
      desc: "Tamil Nadu current affairs",
      tag: "CA",
      icon: "ri-newspaper-line",
      link: "https://www.tnpsc.gov.in/English/notifications.aspx"
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
