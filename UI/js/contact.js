// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7og3uQZ6UkVZypHTrFu7fp6H0EGshkZI",
  authDomain: "gilbert-brand.firebaseapp.com",
  databaseURL: "https://gilbert-brand.firebaseio.com",
  projectId: "gilbert-brand",
  storageBucket: "gilbert-brand.appspot.com",
  messagingSenderId: "540824787249",
  appId: "1:540824787249:web:e66b44aea6ca166100b810",
  measurementId: "G-6G7C2JFKB5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference message collection

let messageRef = firebase.firestore();
// console.log(messageRef);

const messageError = document.querySelector(".error-message");
const contactForm = document.querySelector("#form");

// get value from the form

const getInputValue = (id) => {
  return document.getElementById(id).value;
};

const submitMessage = (e) => {
  let name = getInputValue("name");
  let email = getInputValue("email");
  let message = getInputValue("message");

  // save message

  saveMessage(name, email, message);
  document.querySelector(".alert").style.display = "block";
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  contactForm.reset();
};

const db = messageRef.collection("Messages");

// Save message to firebase

const saveMessage = (name, email, message) => {
  let newMessageRef = db.doc();
  newMessageRef
    .set({
      name: name,
      email: email,
      message: message,
    })
    .then(() => {
      console.log("saved");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Validate form

const validateForm = (e) => {
  e.preventDefault();
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (getInputValue("name").trim() === "") {
    messageError.style.display = "block";
    messageError.textContent = "name can not be empty";
    document.getElementById("name").style.border = "2px solid red";
    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else if (getInputValue("name").trim().length < 3) {
    messageError.style.display = "block";
    messageError.textContent = "name must be at least 3 characters";
    document.getElementById("name").style.border = "2px solid red";
    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);

    return false;
  } else if (!getInputValue("email").trim().match(mailformat)) {
    messageError.style.display = "block";
    messageError.textContent = "You have entered an invalid email address!";
    document.getElementById("email").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);

    return false;
  } else if (getInputValue("message").trim() === "") {
    messageError.style.display = "block";
    messageError.textContent = "message can not be empty";
    document.getElementById("message").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else if (getInputValue("message").trim().length < 30) {
    messageError.style.display = "block";
    messageError.textContent = "message must be at least 30 characters";
    document.getElementById("message").style.border = "2px solid red";

    setTimeout(() => {
      messageError.style.display = "none";
    }, 3000);
    return false;
  } else {
    submitMessage();
    document.getElementById("name").style.border = "0px solid red";
    document.getElementById("email").style.border = "0px solid red";
    document.getElementById("message").style.border = "0px solid red";

    return true;
  }
};
contactForm.addEventListener("submit", validateForm);
