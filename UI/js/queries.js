const queriesContainer = document.getElementById("queries-container");

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

// Reference message collection

let messageRef = firebase.firestore();
// get message
const createMessage = (id, name, email, message) => {
  let td1 = document.createElement("td");
  td1.setAttribute("class", "id");
  let td2 = document.createElement("td");
  td2.setAttribute("class", "name");
  let td3 = document.createElement("td");
  td3.setAttribute("class", "email");
  let td4 = document.createElement("td");
  td4.setAttribute("class", "message");

  // row container

  let tr = document.createElement("tr");

  td1.textContent = id;
  td2.textContent = name;
  td3.textContent = email;
  td4.textContent = message;

  // append td to tr
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  // add tr to tbody
  queriesContainer.appendChild(tr);
};
const getMessage = () => {
  messageRef
    .collection("Messages")
    .get()
    .then((snapshot) => {
      snapshot.forEach((docs) => {
        createMessage(
          docs.data().id,
          docs.data().name,
          docs.data().email,
          docs.data().message
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
getMessage();
