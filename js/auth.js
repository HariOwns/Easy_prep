function showLogin() {
  toggle(true);
}

function showSignup() {
  toggle(false);
}

function toggle(isLogin) {
  loginBox.classList.toggle("hidden", !isLogin);
  signupBox.classList.toggle("hidden", isLogin);

  loginTab.classList.toggle("active", isLogin);
  signupTab.classList.toggle("active", !isLogin);

  hideError();
}

function showError(msg) {
  errorBox.innerText = msg;
  errorBox.style.display = "block";
}

function hideError() {
  errorBox.style.display = "none";
}

/* SIGNUP */
function signup() {
  hideError();

  if (!suName.value || !suMobile.value || !suPassword.value || !suExam.value) {
    showError("Please fill all mandatory fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[suMobile.value]) {
    showError("User already exists. Please login.");
    return;
  }

  users[suMobile.value] = {
    name: suName.value,
    mobile: suMobile.value, 
    password: suPassword.value,
    exam: suExam.value,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", suMobile.value);

  window.location.href = "dashboard.html";
}

/* LOGIN */
function login() {
  hideError();

  if (!liMobile.value || !liPassword.value) {
    showError("Please enter all required fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[liMobile.value]) {
    showError("User not found. Please signup first.");
    return;
  }

  if (users[liMobile.value].password !== liPassword.value) {
    showError("Incorrect password");
    return;
  }

  localStorage.setItem("currentUser", liMobile.value);
  window.location.href = "dashboard.html";
}

function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("ri-eye-off-line");
    icon.classList.add("ri-eye-line");
  } else {
    input.type = "password";
    icon.classList.remove("ri-eye-line");
    icon.classList.add("ri-eye-off-line");
  }
}
