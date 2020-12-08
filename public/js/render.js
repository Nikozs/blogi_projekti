"use strict";
const url = "http://localhost:3000";
const signupForm = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
const logincontainer = document.querySelector(".logincontainer");
const signupcontainer = document.querySelector(".signupcontainer");
const navLogout = document.querySelector("#navlogout");
const navLogin = document.querySelector("#navlogin");
const navHome = document.querySelector("#navhome");
const navSignup = document.querySelector("#navsignup");
const navMyblog = document.querySelector("#navmyblog");
const userInfo = document.querySelector("#userinfo");
const frontpageContainer = document.querySelector(".frontpageContainer");
const searchResults = document.querySelector(".searchresultsContainer");
const search = document.querySelector("#search");
const randomBlogsit = document.querySelector("#randomBlogitList");
const popularBlogsit = document.querySelector("#popularBlogitList");
const queryString = window.location.search;
const mainContainer = document.querySelector(".mainContainer");


const renderSelectedPost = async () => {
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);

  if (URLSearchParams.has("blogid")) {
    const blogid = urlParams.get("blogid");
    console.log(blogid);
    getBlogById(blogid);
    
    // Lets print in innerhtml here...
    
  }
  if (sessionStorage.getItem("blogid") !== undefined) {
    const blogid = urlParams.get("blogid");
    console.log(blogid);
    getBlogById(blogid);

    // Lets print in innerhtml here...
  }
};


const renderUsersBlogs = async () => {
  const queryString = window.location.search;
  console.log(queryString);

  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("ShowUserid")) {
    const userid = urlParams.get("ShowUserid");
    console.log(userid);
    var userinblogit = await getBlogsByUserId(userid);

   
      mainContainer.innerHTML = `<div class="header">`
      const header = document.querySelector(".header");
         if (sessionStorage.getItem("loggedUserId") !== undefined && userid == sessionStorage.getItem("loggedUserId")) {
          header.innerHTML += `<button id="editBlogInfo" onclick="editBlogInfoForm()">Edit</button>`
      }
      header.innerHTML +=`<h2>Blog Name</h2></div></div>`

    var leftcolumn = `<div class="leftcolumn">`

    if (sessionStorage.getItem("loggedUserId") !== undefined && userid == sessionStorage.getItem("loggedUserId")) {
    leftcolumn+=`<button id="addNewPost" onclick="openNewBlogForm()" style="width: 100%">Add new</button>`
    }

    for (var b = 0; b < userinblogit.length; b++) {

    if (userinblogit[b].Image == null) {
      imgsrc = '';
    } else {
    var imgsrc = url + '/' + userinblogit[b].Image;
    }
      // img.alt = userinblogit[b].Title;
      // img.classList.add('resp');

      var blogi = userinblogit[b];
      leftcolumn +=  
      `<div class="card">
      <h3> ` + blogi.Title + `</h3>
      <h5> Created at: ` + blogi.CreateAt + `</h5>
      <div class="blogbody">
      <div class="fakeimg" style="height: 200px">
      <img class="blogikuvat" src="`+imgsrc+`"/>
      Image</div>
      <p class="content">Sisältö: ` + blogi.Content + `</p>
      </div>
      <p class="blogLikes">Likes: ` + blogi.amountOfLikes + ` <button>+</button><button>-</button></p>
      <p class="blogCategory">Category: <button>dfg</button></p>`

      if (sessionStorage.getItem("loggedUserId") !== undefined && blogi.UserID == sessionStorage.getItem("loggedUserId")) {
        leftcolumn+='<button onclick="openModifyBlogForm()">Muokkaa</button>';
      }

      leftcolumn+=`</div>`
    }

    leftcolumn+= `</div>`
     mainContainer.innerHTML+=leftcolumn;

     mainContainer.innerHTML+=  
     `<div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height: 100px">Image</div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
        </div>
        <div class="card">
          <h3>Popular Post</h3>
          <div class="fakeimg">Image</div>
          <br />
          <div class="fakeimg">Image</div>
          <br />
          <div class="fakeimg">Image</div>
        </div>
      </div>
    </div>`

  } else if (sessionStorage.getItem("loggedUserId") !== undefined) {
    const blogid = sessionStorage.getItem("loggedUserId");
    console.log(blogid);
    var userinblogit = await getBlogsByUserId(blogid);

    for (var b = 0; b < userinblogit.length; b++) {
      var blogi = userinblogit[b];

      mainContainer.innerHTML +=
        `<li>
        <img></img>
        <h3> ` +
        blogi.Title +
        `</h3>
        <p>Likes: ` +
        blogi.amountOfLikes +
        `</p>
        <p>User: ` +
        blogi.UserID +
        `</p>
        </li>`;
    }
  } else {
    // Current user
    console.log("Ei ole määriteltyä käyttäjää"); 
  }
};


function editBlogInfoForm() {
  var popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.innerHTML = 
  `<div id="editBlogInfoPopupoverlay" class="modaloverlay">
  <div id="editBlogInfoPopup">
  <h1>Edit your profile:</h1>
  <form id="newBlogForm">
  <label for="BlogName"><b>Blog Name</b></label>
    <input type="text" placeholder="Enter Blog Name" name="BlogName" required>
    <br>
    <label for="AboutMe"><b>About Me:</b></label>
    <textarea id="description" rows="10" cols="30" placeholder="Enter description" name="content" required></textarea><br>
    
    <p>Add profile image:</p>

    <button type="submit">Confirm</button>
    <button type="submit" onclick="closeForm()">Cancel</button>
  </form>
  </div>
  `;
  document.body.appendChild(popup);
  document.body.style = "overflow: hidden";
};

function openNewBlogForm() {
  var popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.innerHTML = 
  `<div id="newBlogPopupoverlay" class="modaloverlay">
  <div id="newBlogPopup">
  <h1>Add new blog</h1>
  <form id="newBlogForm" enctype="multipart/form-data">
  <label for="title"><b>Title: </b></label><br>
    <input type="text" placeholder="Enter title" name="Title" required><br>
    <br>
    <label for="image"><b>Image: </b></label><br>
    <input type="file" name="Image" accept="image/*" placeholder="Choose file">
   <br>
    <br>
    <label for="content"><b>Blog text: </b></label><br>
    <textarea id="content" rows="10" cols="30" placeholder="Enter content" name="Content" required></textarea><br>
    <br><br>
    <label for="category">Choose category:</label>
    <select name="Category" id="category">
      <option value="category1">category1</option>
      <option value="category2">category2</option>
      <option value="category3">category3</option>
      <option value="category4">category4</option>
    </select> 
    <br><br>
    <button type="submit" >Add</button>
    <button type="button" onclick="closeForm()">Cancel</button>
    <input type="hidden" name="UserID" value="`+sessionStorage.getItem("loggedUserId")+`">
  </form>
  </div>
  `;
  popup.addEventListener("submit", onBlogSubmit);
  document.body.appendChild(popup);
  document.body.style = "overflow: hidden";
};

async function onBlogSubmit(evt){
  evt.preventDefault();

// var params = {};

// var inputs = document
// .getElementById("newBlogForm")
// .getElementsByTagName("input");

//   for (var i = 0; i < inputs.length; i++) {
//     var curr = inputs[i];
//     if (curr.getAttribute("type") === "text") {
//       params[curr.getAttribute("name")] = curr.value;
//     }
//     if (curr.getAttribute("type") === "password") {
//       params[curr.getAttribute("name")] = curr.value;
//     }
//   }

//   var textareas = document
// .getElementById("newBlogForm")
// .getElementsByTagName("textarea");

//   for (var i = 0; i < textareas.length; i++) {
//     var curr = textareas[i];
//       params[curr.getAttribute("name")] = curr.value;
//   }
  
//   var images = document
//   .getElementById("newBlogForm")
//   .getElementsByTagName("input");
  
//     for (var i = 0; i < images.length; i++) {
//       var curr = images[i];
//       if (curr.getAttribute("type") === "file") {
//         params[curr.getAttribute("name")] = curr.value;
//       }
//     }

//     var selects = document
//     .getElementById("newBlogForm")
//     .getElementsByTagName("select");
    
//       for (var i = 0; i < selects.length; i++) {
//         var curr = selects[i];
  
//           params[curr.getAttribute("name")] = curr.value;
//       }

//       params["UserID"]= sessionStorage.getItem("loggedUserId");

//       var files = document
//       .getElementById("newBlogForm")
//       .getElementsByTagName("file")
//       for (var i = 0; i < files.length; i++) {
//         var curr = files[i];
  
//           params[curr.getAttribute("name")] = curr.value;
//       }
let newBlogForm = document.getElementById("newBlogForm") 
let params = new FormData(newBlogForm);

  closeForm();

  const fetchOptions = {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    // body: JSON.stringify(params),
    body: params
  };

  const response = await fetch(url + "/blogs", fetchOptions);
  const json = await response.json();
  console.log("Add blog response", json);
  if (!json.user) {
    alert(json.message);
  } else {
    // 
  }
  //await addBlog(JSON.stringify(params));
}


function openModifyBlogForm() {
  var popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.innerHTML = 
  `<div id="modifyBlogPopupoverlay" class="modaloverlay">
  <div id="modifyBlogPopup">
  <h1>Edit blog</h1>
  <form id="modifyBlogForm">
  <label for="title"><b>New title: </b></label>
    <input type="text" placeholder="Enter title" name="title" required>

    <p>Change image:</p>

    <label for="content"><b>Edit Blog text: </b></label>
    <textarea id="content" rows="10" cols="30" placeholder="Enter content" name="content" required></textarea><br>

    <label for="category">Change category:</label>
    <select name="category" id="category">
      <option value="category1">category1</option>
      <option value="category2">category2</option>
      <option value="category3">category3</option>
      <option value="category4">category4</option>
    </select> 
    <br>
    <button type="submit">Add</button>
    <button type="submit" onclick="closeForm()">Cancel</button>
  </form>
  </div>
  `;
  document.body.appendChild(popup);
  document.body.style = "overflow: hidden";
};

function closeForm() {
  document.body.removeChild(popup);
  document.body.style = "overflow: auto";
};


async function renderRandomBlogs() {
  var randomBlogit = await getRandomBlogs();

  for (var b = 0; b < randomBlogit.length; b++) {
    var blogi = randomBlogit[b];

    randomBlogsit.innerHTML +=
    `<li>
    <img></img>
    <h3> ` + blogi.Title + `</h3>
    <p>Likes: ` + blogi.amountOfLikes + `</p>
    <p>User: ` + blogi.UserID + `</p>
    <button>View</button>
    </li>`;
  }
}

async function renderPopularBlogs() {
  var popularBlogit = await getPopularBlogs();

  for (var b = 0; b < popularBlogit.length; b++) {
    var blogi = popularBlogit[b];

    popularBlogsit.innerHTML +=
      `<li>
      <img style="width: 100%; height: 250px"></img>
      <h3> ` + blogi.Title + `</h3>
      <p>Likes: ` + blogi.amountOfLikes + `</p>
      <p>User: ` + blogi.UserID + `</p>
      <button onclick="renderSelectedPost()">View</button>
      </li>`;
  }
}

async function renderSearchResults(jep) {
  var blogit = await getBlogs();

  searchResults.innerHTML = "<h1>Search Results</h1>";

  if (blogit.length > 0) {
    for (var b = 0; b < blogit.length; b++) {
      var blogi = blogit[b];
      console.log("blogi", blogi);
      searchResults.innerHTML += "<h3>" + blogi.Title + "</h3>";
      searchResults.innerHTML += "<p>" + blogi.Content + "</p>";
      searchResults.innerHTML += "<button>Go</button>";
    }
  } else {
    searchResults.innerHTML += "<p>No results</p>";
  }

  searchResults.style.display = "block";
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  mainContainer.style.display = "none";
}

async function onPageLoading() {
  // If we have param
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("ShowUserid")) {
    // Lets render current users blog
    renderUsersBlogs();
  } else if (urlParams.has("blogid")) {
    // lets render only this one blog
    renderSelectBlog();
  } else {
    // Lets render popular/randomblogs
    renderPopularBlogs();
    renderRandomBlogs();
  }
}




/*
  Communications with backend
*/
const getBlogById = async (blogid) => {
  try {
    const response = await fetch(url + "/blogs/" + blogid);
    const blog = await response.json();

    console.log(blog);
    return blog;
  } catch (e) {
    console.log(e.message);
  }
};

const getBlogsByUserId = async (ShowUserid) => {
  try {
    const response = await fetch(url + "/blogs/ByUser/" + ShowUserid);
    const blogs = await response.json();

    console.log(blogs);
    return blogs;
  } catch (e) {
    console.log(e.message);
  }
};

const getBlogs = async () => {
  var searchText = search.value;

  try {
    const response = await fetch(url + "/blogs/search/" + searchText);
    const blogs = await response.json();

    console.log(blogs);
    return blogs;
  } catch (e) {
    console.log(e.message);
  }
};

const getRandomBlogs = async () => {
  try {
    const response = await fetch(url + "/blogs/randomblogs");
    const blogs = await response.json();

    console.log(blogs);
    return blogs;
  } catch (e) {
    console.log(e.message);
  }
};

const getPopularBlogs = async () => {
  try {
    const response = await fetch(url + "/blogs/popularblogs");
    const blogs = await response.json();

    console.log(blogs);
    return blogs;
  } catch (e) {
    console.log(e.message);
  }
};

const getUsers = async () => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/user", options);
    const users = await response.json();
    createUserOptions(users);
  } catch (e) {
    console.log(e.message);
  }
};


const addBlog = async (blogData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: blogData,
    };
    return await fetch(url + '/blogs', options);
  } catch (e) {
    throw new Error(e.message);
  }
};

const modifyBlog = async (data) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };
    return await fetch(url + '/blogs', options);
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteBlog = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  try {
    return await fetch(url + '/blogs/' + id, options);
  } catch (e) {
    // console.log(e.message());
    throw new Error(e.message);
  }
};


const addLike = async (id) => {

};


const removeLike = async (id) => {

};


const createUserOptions = (users) => {
  userLists.forEach((list) => {
    // clear user list
    list.innerHTML = "";
    users.forEach((user) => {
      // create options with DOM methods
      const option = document.createElement("option");
      option.value = user.user_id;
      option.innerHTML = user.name;
      option.classList.add("light-border");
      list.appendChild(option);
    });
  });
};


/* 
  Listeners
*/
signupForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  var inputs = document
    .getElementById("signupForm")
    .getElementsByTagName("input");

  var params = {};

  for (var i = 0; i < inputs.length; i++) {
    var curr = inputs[i];
    if (curr.getAttribute("type") === "text") {
      params[curr.getAttribute("name")] = curr.value;
    }
    if (curr.getAttribute("type") === "password") {
      params[curr.getAttribute("name")] = curr.value;
    }
  }

  console.log(params);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  console.log("user add response", json);
 
  if (!json.user) {
    alert('Rekisteröinti epäonnistui!');
  } else {
  // save token
  sessionStorage.setItem("token", json.token);
  sessionStorage.setItem("loggedUserId", json.user.ID);

  //show/hide
  navMyblog.style.display = "block";
  navMyblog.href = "?ShowUserid=" + sessionStorage.getItem("loggedUserId");
  loginForm.style.display = "none";
  mainContainer.style.display = "block";
  frontpageContainer.style.display = "block";
  navLogout.style.display = "block";
  navSignup.style.display = "none";
  signupForm.style.display = "none";
  getUsers();
  alert('Rekisteröinti onnistui!');
  }
  window.location.reload();
});


loginForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  var inputs = document
    .getElementById("loginForm")
    .getElementsByTagName("input");

  var params = {};

  for (var i = 0; i < inputs.length; i++) {
    var curr = inputs[i];
    if (curr.getAttribute("type") === "text") {
      params[curr.getAttribute("name")] = curr.value;
    }
    if (curr.getAttribute("type") === "password") {
      params[curr.getAttribute("name")] = curr.value;
    }
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url + "/auth/login", fetchOptions);
  const json = await response.json();
  console.log("login response", json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem("token", json.token);
    sessionStorage.setItem("loggedUserId", json.user.ID);

    // show/hide
    navMyblog.style.display = "block";
    navMyblog.href = "?ShowUserid=" + sessionStorage.getItem("loggedUserId");
    loginForm.style.display = "none";
    navLogout.style.display = "block";
    navLogin.style.display = "none";
    navSignup.style.display = "none";
    frontpageContainer.style.display = "block";
    signupForm.style.display = "none";
    searchResults.style.display = "none";
    mainContainer.style.display = "block";

    getUsers();

    alert("Kirjautuminen onnistui!");
    window.location.reload();
  }
});

navMyblog.addEventListener("click", async (evt)=>{
  //evt.preventDefault();
  navMyblog.setAttribute("class", "active")
  navLogin.setAttribute("class", "");
  navHome.setAttribute("class", "");
  navSignup.setAttribute("class", "")
});

navLogout.addEventListener("click", async (evt) => {
  evt.preventDefault();
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/auth/logout", options);
    const json = await response.json();
    console.log(json);

    // remove token
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedUserId")
    alert("You have logged out");

    // show/hide
    navMyblog.href = "/";
    navMyblog.style.display = "none";
    navLogout.style.display = "none";
    navSignup.style.display = "block";
    navLogin.style.display = "block";
  } catch (e) {
    console.log(e.message);
  }
  window.location.reload();
});

navSignup.addEventListener("click", async (evt) => {
  evt.preventDefault();

  navSignup.setAttribute("class", "active");
  navLogin.setAttribute("class", "");
  navHome.setAttribute("class", "");
  navMyblog.setAttribute("class", "")

  searchResults.style.display = "none";
  loginForm.style.display = "none";
  signupForm.style.display = "block";
  frontpageContainer.style.display = "none";
  mainContainer.style.display = "none";
});

navLogin.addEventListener("click", async (evt) => {
  evt.preventDefault();

  navLogin.setAttribute("class", "active");
  navHome.setAttribute("class", "");
  navSignup.setAttribute("class", "");
  navMyblog.setAttribute("class", "")

  searchResults.style.display = "none";
  frontpageContainer.style.display = "none";
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  mainContainer.style.display = "none";
});

navHome.addEventListener("click", async (evt) => {
  evt.preventDefault();

  navHome.setAttribute("class", "active");
  navLogin.setAttribute("class", "");
  navSignup.setAttribute("class", "");
  navMyblog.setAttribute("class", "");

  frontpageContainer.style.display = "block";
  signupForm.style.display = "none";
  loginForm.style.display = "none";
  searchResults.style.display = "none";
});

// when app starts, check if token exists and hide login form etc.
if (sessionStorage.getItem("token")) {
  navMyblog.href = "?ShowUserid=" + sessionStorage.getItem("loggedUserId")
  frontpageContainer.style.display = "block";
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  navLogout.style.display = "block";
  navLogin.style.display = "none";
  navSignup.style.display = "none";
  navMyblog.style.display = "block";
  getUsers();
}