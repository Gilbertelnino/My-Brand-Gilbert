const uploadButton = document.getElementById("blog-form");

// get files images

const fileButton = document.getElementById("fileButton");

let uploader = document.getElementById("uploader");

// listen for file selection

const uploadFile = (e) => {
  e.preventDefault();
  // get file
  let file = document.getElementById("image").files[0];
  let title = document.getElementById("title").value;
  let subtitle = document.getElementById("subtitle").value;
  //   let content = document.getElementById("blog-content").value;
  let blogContent = CKEDITOR.instances["blog-content"].getData();
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
        firebase
          .database()
          .ref("Blogs/")
          .push()
          .set(
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
                alert("successfully");
                document.getElementById("blog-form").reset();
                document.getElementById("blog-content").reset();
              }
            }
          );
      });
    }
  );
};

// event listener
uploadButton.addEventListener("submit", uploadFile);

// canceling publish

document.getElementById("cancel-btn").addEventListener("click", (e) => {
  document.getElementById("blog-form").reset();
  document.getElementById("image").files[0].reset();
});
