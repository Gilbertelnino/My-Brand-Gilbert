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
