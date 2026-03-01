document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("libUser");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutBtn = document.getElementById("logoutBtn");

  if (loggedInUser) {
    if(loginLink) loginLink.style.display = "none";
    if(signupLink) signupLink.style.display = "none";
    if(logoutBtn) logoutBtn.style.display = "inline";
  }

  if(logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("libUser");
      window.location.href = "login.html";
    });
  }
});
