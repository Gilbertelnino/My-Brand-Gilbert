window.onload = function () {
  getData();
};

const getData = () => {
  firebase
    .database()
    .ref("Blogs/")
    .once("value")
    .then((snapshot) => {
      let blog_posts = document.querySelector(".blog-container");
      // remove all remaining data in that div
      blog_posts.innerHTML = "";

      // get data from datbase
      let data = snapshot.val();
      //   let databaseBlogs = Object.entries(data);
      // console.log(data);
      // passing data to a div
      // run for loop to get all the posts

      for (let [key, value] of Object.entries(data)) {
        blog_posts.innerHTML = `
            <div class="card">
                <a href="#">
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
              </div> ${blog_posts.innerHTML}`;
      }
    });
};

// getData();
