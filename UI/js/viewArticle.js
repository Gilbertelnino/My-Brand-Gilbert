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

commentForm.addEventListener("submit", createComments);
