// VIEW FULL MODEL
const urlParams = new URLSearchParams(window.location.search);
const article = urlParams.get("blog");
const fullMode = () => {
  firebase
    .database()
    .ref(`Blogs/${article}`)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        console.log("exists!");
        let data = snapshot.val();
        document
          .getElementsByClassName("blog-img")[0]
          .setAttribute("src", data.imageURL);
        document.getElementsByClassName("blog-title")[0].innerHTML = data.title;
        document.getElementsByClassName("blog-content-detail")[0].innerHTML =
          data.content;
      } else {
        document.getElementsByClassName("blog-content-detail")[0].innerHTML = `
        <div style="font-size:4rem"><h3>Article not found</h3></div>
        `;
      }
    })
    .catch((err) => {
      document.getElementsByClassName("blog-content-detail")[0].innerHTML = `
      <div style="font-size: 4rem"><h3>${err}</h3></div>
      `;
    });
};

fullMode();

// add comment
const commentForm = document.querySelector("#comment-form");

const createComments = (e) => {
  e.preventDefault();
  let commentName = document.getElementById("comment-name").value;
  let commentEmail = document.getElementById("comment-email").value;
  let commentContent = document.getElementById("comment-content").value;
  firebase
    .database()
    .ref("Blogs/Comments/")
    .push()
    .set({
      name: commentName,
      email: commentEmail,
      content: commentContent,
      article_id: article,
    })
    .then(() => {
      document.getElementById("comment").innerHTML += `
    <div class="comment">
              <i class="fas fa-comment"></i>
              <div class="com-content">
                <h3>${commentName}</h3>
                <p>
                  ${commentContent}
                </p>
              </div>
            </div>
    `;
      commentForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
};

// get database ref and load comment

const databaseRef = firebase.database().ref();

function loadComments() {
  databaseRef
    .child("Comments/")
    .orderByChild("article_id")
    .equalTo(article)
    .on("value", (snapshot) => {
      let data = snapshot.val();
      // comments container
      let commentsContainer = document.getElementById("comment");
      // initial container as empty string
      commentsContainer.innerHTML = "";
      // add for loop to display all comment in comment section
      if (data === undefined) {
        return undefined;
      } else if (data === null) {
        return null;
      } else {
        for (let [key, value] of Object.entries(data)) {
          // console.log(key.article_id);
          commentsContainer.innerHTML = `
          <div class="comment">
          <i class="fas fa-comment"></i>
          <div class="com-content">
            <h3>${value.name}</h3>
            <p>
              ${value.content}
            </p>
          </div>
        </div>
   ${commentsContainer.innerHTML}`;
        }
      }
    });
}

// load recomandation article

function loadRecommended() {
  databaseRef
    .child("Blogs")
    .orderByChild("key")
    .limitToLast(7)
    .once("value", (snapshot) => {
      let data = snapshot.val();
      // console.log(data);

      const recommendedContainer = document.querySelectorAll(".grid2")[0];
      recommendedContainer.innerHTML = "";

      // load all recommende article

      for (let [key, value] of Object.entries(data)) {
        if (key !== article) {
          recommendedContainer.innerHTML += `
          <div class="detail">
              <a href="./article.html?blog=${key}"> <img src=${value.imageURL} alt="" /></a>
              <a href="./article.html?blog=${key}">
                <p>${value.title}</p>
              </a>
            </div>`;
        }
      }
    });
}

// load story you may like

const recommendAnotherStories = () => {
  databaseRef
    .child("Blogs")
    .orderByChild("key")
    .limitToLast(3)
    .once("value", (snapshot) => {
      let data = snapshot.val();
      // console.log(data);

      const recommendedContainer = document.querySelectorAll(
        ".other-stories"
      )[0];
      recommendedContainer.innerHTML = "";

      // load all recommende article

      for (let [key, value] of Object.entries(data)) {
        if (key !== article) {
          recommendedContainer.innerHTML += `
        <div class="card">
              <a href="./article.html?blog=${key}">
                <img src=${value.imageURL} alt="blog img" />
                <h1>${value.title}</h1>
                <p>
                  ${value.subtitle}
                  <span class="more">read more </span>
                </p>
              </a>
              <div class="btn-link-container">
                <a href="#">
                  <span>10<i class="fas fa-comment"></i></span>
                </a>
                <a href="#">
                  <span>15<i class="far fa-thumbs-up"></i></span>
                </a>
              </div>
            </div>`;
        }
      }
    });
};
recommendAnotherStories();

loadRecommended();

loadComments();

commentForm.addEventListener("submit", createComments);
