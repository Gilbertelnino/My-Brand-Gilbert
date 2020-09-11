const editTitle = document.querySelector(".edit-title");
const editSubtitle = document.querySelector(".edit-subtitle");
const editImage = document.querySelector(".edit-image");
const previewImage = document.querySelector(".image-preview");
// const editContent = document.querySelector("#blog-edit-content");
const editForm = document.querySelector("#edit-blog");

// getting post id
const urlParams = new URLSearchParams(window.location.search);
const article = urlParams.get("key");
const blogs = firebase.database().ref(`Blogs/${article}`);

blogs
  .once("value", (snapshot) => {
    if (snapshot.exists()) {
      console.log("exists!");
      let data = snapshot.val();
      console.log(data);
      editTitle.value = data.title;
      editSubtitle.value = data.subtitle;
      previewImage.innerHTML = `<img src=${data.imageURL} style="width:100px"/>`;
      CKEDITOR.instances["blog-edit-content"].insertHtml(data.content);
    } else {
      throw new Error("article not found!!");
    }
  })
  .catch((err) => {
    alert(err.message);
  });

// update image
function showImage(e) {
  previewImage.innerHTML = "";
  file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const preview = document.createElement("img");
      preview.setAttribute("src", reader.result);

      return previewImage.appendChild(preview);
    });

    reader.readAsDataURL(file);
  }
}

editImage.addEventListener("change", showImage);

const updateInfo = (e) => {
  e.preventDefault();
  // get file
  let file = document.getElementById("image").files[0];
  let title = document.getElementById("title").value;
  let subtitle = document.getElementById("subtitle").value;
  let blogContent = CKEDITOR.instances["blog-edit-content"].getData();
  let author = document.getElementById("author").selectedIndex;
  let authorsName = document.getElementsByTagName("option")[author].value;

  // create a storage ref

  let storageRef = firebase.storage().ref("blogImages/" + file.name);
  let uploadTask = storageRef.put(file);
  // update progress bar
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
      console.log("upload " + percentage + " done!");
    },
    function (error) {
      console.log(error.message);
    },
    function () {
      // handle success upload
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // get image download url here and upload it to database
        // out path where data stored, ... push is used to make every post have unique id
        blogs.update(
          {
            title: title,
            subtitle: subtitle,
            content: blogContent,
            author: authorsName,
            imageURL: downloadURL,
          },
          function (error) {
            if (error) {
              alert("error image not uploaded");
            } else {
              alert("blog updated successfully");
              editForm.reset();
            }
          }
        );
      });
    }
  );
};
editForm.addEventListener("submit", updateInfo);
