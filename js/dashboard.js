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

function toggleThemePanel(){

const panel = document.getElementById("themePanel");

panel.style.display =
panel.style.display === "block" ? "none" : "block";

}


/* THEME MODE */

function setThemeMode(mode){

if(mode==="dark"){
document.body.classList.add("dark");
localStorage.setItem("theme","dark");
}

if(mode==="light"){
document.body.classList.remove("dark");
localStorage.setItem("theme","light");
}

}


/* ACCENT COLOR */

function setAccent(color){

document.documentElement.style.setProperty('--accent',color);

document.documentElement.style.setProperty(
'--accent-soft',
color + "22"   // light transparent background
);

localStorage.setItem("accentColor",color);

}


/* LOAD SAVED SETTINGS */

window.addEventListener("load",()=>{

const savedAccent = localStorage.getItem("accentColor");
const savedTheme = localStorage.getItem("theme");

if(savedAccent){

document.documentElement.style.setProperty('--accent',savedAccent);
document.documentElement.style.setProperty('--accent-soft',savedAccent+"22");

}

if(savedTheme==="dark"){
document.body.classList.add("dark");
}

});


/* LOAD SAVED THEME */

window.addEventListener("load",()=>{

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark");
}

});

const slides=document.querySelectorAll(".slide");
const dotsContainer=document.querySelector(".carousel-dots");

let index=0;

slides.forEach((_,i)=>{
let dot=document.createElement("span");
dot.addEventListener("click",()=>{
showSlide(i);
});
dotsContainer.appendChild(dot);
});

const dots=document.querySelectorAll(".carousel-dots span");

function showSlide(i){
slides.forEach(s=>s.classList.remove("active"));
dots.forEach(d=>d.classList.remove("active"));

slides[i].classList.add("active");
dots[i].classList.add("active");

index=i;
}

function autoSlide(){
index++;
if(index>=slides.length) index=0;
showSlide(index);
}

showSlide(0);
setInterval(autoSlide,4000);

/* ================= TNPSC CHATBOT ENGINE ================= */
/* ================= CHATBOT ================= */

/* ================= USER NAME FROM AUTH ================= */

/* tries to fetch logged in user name */
const userData = JSON.parse(localStorage.getItem("user") || "{}");
const userName = userData.name || "User";


/* ================= CHATBOT TOGGLE ================= */

function toggleChatbot(){

const box = document.getElementById("chatbotBox");

if(box.style.display==="flex"){
box.style.display="none";
}else{
box.style.display="flex";
}

}


/* ================= ENTER KEY ================= */

function handleChat(e){
if(e.key==="Enter"){
sendMessage();
}
}


/* ================= SEND MESSAGE ================= */

function sendMessage(){

const input=document.getElementById("chatInput");
const text=input.value.trim();

if(!text) return;

addUserMessage(text);
input.value="";

showTyping();

setTimeout(()=>{
botReply(text);
},1000);

}


/* ================= USER MESSAGE ================= */

function addUserMessage(text){

const chatBody=document.getElementById("chatBody");

const msg=document.createElement("div");
msg.className="user-msg";
msg.innerText=text;

chatBody.appendChild(msg);
chatBody.scrollTop=chatBody.scrollHeight;

}


/* ================= BOT MESSAGE ================= */

function addBotMessage(text){

const chatBody=document.getElementById("chatBody");

const msg=document.createElement("div");
msg.className="bot-msg";
msg.innerText=text;

chatBody.appendChild(msg);
chatBody.scrollTop=chatBody.scrollHeight;

}


/* ================= TYPING ANIMATION ================= */

function showTyping(){

const chatBody=document.getElementById("chatBody");

const typing=document.createElement("div");
typing.className="bot-msg";
typing.id="typingIndicator";
typing.innerText="Bot is typing...";

chatBody.appendChild(typing);
chatBody.scrollTop=chatBody.scrollHeight;

}

function removeTyping(){

const typing=document.getElementById("typingIndicator");

if(typing){
typing.remove();
}

}


/* ================= BOT REPLY ================= */

function botReply(msg){

removeTyping();

msg=msg.toLowerCase();

/* GREETING */

if(msg.startsWith("hi") || msg.startsWith("hello")){

addBotMessage(`Hello ${userName} 👋  
Nice to see you!  
How can I help you today?`);

}

/* TNPSC */

else if(msg.includes("tnpsc")){

addBotMessage("TNPSC stands for Tamil Nadu Public Service Commission. It conducts recruitment exams for Tamil Nadu government jobs.");

}

/* GROUP 2 */

else if(msg.includes("group 2")){

addBotMessage("TNPSC Group 2 exam includes posts like Sub-Registrar, Assistant Section Officer and Municipal Commissioner.");

}

/* GROUP 4 */

else if(msg.includes("group 4")){

addBotMessage("TNPSC Group 4 exam includes posts such as VAO, Junior Assistant, Typist and Steno-Typist.");

}

/* SYLLABUS */

else if(msg.includes("syllabus")){

addBotMessage("TNPSC syllabus includes Polity, History, Geography, Economy, Aptitude and Current Affairs.");

}

/* CURRENT AFFAIRS */

else if(msg.includes("current affairs")){

addBotMessage("For TNPSC current affairs focus on Government schemes, Tamil Nadu news and national developments.");

}

/* DEFAULT */

else{

addBotMessage("I’m your TNPSC assistant. Ask about syllabus, Group exams, or current affairs.");

}

/* show followup options */
showFollowUp();

}


/* ================= SUGGESTIONS ================= */

const suggestionList=[

"TNPSC syllabus",
"Group 2 exam details",
"Group 4 exam details",
"Current affairs for TNPSC",
"Indian polity",
"Indian history",
"Indian economy",
"Geography of India"

];


function showSuggestions(){

const input=document.getElementById("chatInput").value.toLowerCase();
const box=document.getElementById("suggestions");

box.innerHTML="";

if(input.length===0){
box.style.display="none";
return;
}

const filtered=suggestionList.filter(item =>
item.toLowerCase().includes(input)
);

filtered.forEach(text=>{

const div=document.createElement("div");
div.className="suggestion-item";
div.innerText=text;

div.onclick=()=>{

document.getElementById("chatInput").value=text;
box.style.display="none";
sendMessage();

};

box.appendChild(div);

});

box.style.display=filtered.length ? "block":"none";

}


/* ================= MENU ACTION ================= */

function menuAction(type){

addUserMessage(type);

showTyping();

setTimeout(()=>{

removeTyping();

if(type==="tn election date"){

addBotMessage("Tamil Nadu Assembly election April 23 2026. Official dates will be announced by the Election Commission.");

}

else if(type==="tn chief minister"){

addBotMessage("The current Chief Minister of Tamil Nadu is M. K. Stalin.");

}

else if(type==="tnpsc group 1"){

addBotMessage("TNPSC Group 1 includes top administrative posts like Deputy Collector, DSP and Assistant Commissioner.");

}

else if(type==="tnpsc group 2"){

addBotMessage("TNPSC Group 2 includes posts such as Sub-Registrar, Assistant Section Officer and Municipal Commissioner.");

}

else if(type==="tnpsc group 2a"){

addBotMessage("TNPSC Group 2A includes non-interview posts like Assistant, Junior Assistant and Personal Clerk.");

}

else if(type==="tnpsc group 4"){

addBotMessage("TNPSC Group 4 includes posts like VAO, Junior Assistant, Typist and Steno-Typist.");

}

else if(type==="tn election parties"){

addBotMessage(`Major political parties in Tamil Nadu elections:
TVK – Leader: Vijay
DMK – Leader: M. K. Stalin  
AIADMK – Leader: Edappadi K. Palaniswami  
BJP – TN Leader: K. Annamalai  
NTK – Leader: Seeman`);

}

else if(type==="tnpsc syllabus"){

addBotMessage("TNPSC syllabus includes Polity, History, Geography, Economy, Aptitude and Current Affairs.");

}

else if(type==="current affairs"){

addBotMessage("Current affairs include government schemes, Tamil Nadu news and national events.");

}

else if(type==="study tips"){

addBotMessage("Study NCERT books, read daily current affairs and practice previous year question papers.");

}

/* show followup */
showFollowUp();

},800);

}


/* ================= FOLLOW UP MENU ================= */

function showFollowUp(){

const chatBody=document.getElementById("chatBody");

const box=document.createElement("div");
box.className="chat-menu";

box.innerHTML=`
<button onclick="showMoreHelp()">Other Help</button>
<button onclick="exitChat()">Exit</button>
`;

chatBody.appendChild(box);

}


/* ================= MORE HELP ================= */

function showMoreHelp(){

const chatBody=document.getElementById("chatBody");

const box=document.createElement("div");
box.className="chat-menu";

box.innerHTML=`
<button onclick="menuAction('tn election date')">TN Election Date</button>
<button onclick="menuAction('tn election parties')">TN Election Parties</button>
<button onclick="menuAction('tnpsc group 1')">TNPSC Group 1</button>
<button onclick="menuAction('tnpsc group 2')">TNPSC Group 2</button>
<button onclick="menuAction('tnpsc group 4')">TNPSC Group 4</button>
`;

chatBody.appendChild(box);

}


/* ================= EXIT ================= */

function exitChat(){

addBotMessage("Thank you 👋 If you need help again, just open the chatbot.");

/* close and reset chatbot */

setTimeout(()=>{

const box = document.getElementById("chatbotBox");
const chatBody = document.getElementById("chatBody");

/* close chatbot */
box.style.display="none";

/* reset chat messages */
chatBody.innerHTML = `
<div class="bot-msg">
Hello ${userName} 👋  
Nice to see you!  
How can I help you today?
</div>
`;

},5000);

}