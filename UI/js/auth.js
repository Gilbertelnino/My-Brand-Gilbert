// keep state change. if user logged in or not

auth.onAuthStateChanged((user) => {
  //   checks if user is logged in
  if (user) {
    getData();
  } else {
    console.log("logged out");
  }
});

const signinForm = document.querySelector("#signin-form");
const errorMessage = document.querySelector("#sign-error");

const signIn = (e) => {
  e.preventDefault();
  const email = signinForm["login-email"].value;
  const password = signinForm["login-password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log("user signed in");
      signinForm.reset();
      window.location.href = "./admin/posts/index.html";
    })
    .catch((err) => {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = err.message;
      setTimeout(() => {
        errorMessage.style.display = "none";
        // errorMessage.innerHTML = err.message;
      }, 5000);
    });
};
// signinForm.addEventListener("submit", signIn);

// logout
const logout = document.querySelector("#logout");

const logOut = (e) => {
  e.preventDefault();
  auth.signOut();
};

logout.addEventListener("click", logOut);
