function getData() {
  firebase
    .database()
    .ref("Blogs/")
    .once("value")
    .then((snapshot) => {
      let blog_posts = document.querySelector("#admin-posts");
      // remove all remaining data in that div
      blog_posts.innerHTML = "";

      // get data from datbase
      let data = snapshot.val();
      //   let databaseBlogs = Object.entries(data);
      //   console.log(data);
      // passing data to a div
      // run for loop to get all the posts

      for (let [key, value] of Object.entries(data)) {
        blog_posts.innerHTML = `
          <tr>
          <td>${key}</td>
          <td>${value.title}</td>
          <td>${value.author}</td>
          <td><a href="./editBlog.html" class="edit" onclick="updateBlog(${key},'${value.title}','${value.subtitle}')">edit</a></td>
          <td><button class="delete" id=${key} onClick="deletePost(
            this.id
          )">delete</button></td>
          <td><a href="#" class="publish">publish</a></td>
        </tr> ${blog_posts.innerHTML}`;
      }
    });
}

function deletePost(key) {
  console.log("article delete");
  firebase
    .database()
    .ref("Blogs/" + key)
    .remove();
  getData();
}
getData();
