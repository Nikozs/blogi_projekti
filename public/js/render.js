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

  mainContainer.innerHTML =     
  `<div class="header">
  <h2>Blog Name</h2>
  <button id="editBlogInfo">Edit</button>
  </div>`
  
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("ShowUserid")) {
    const blogid = urlParams.get("ShowUserid");
    console.log(blogid);
    var userinblogit = await getBlogsByUserId(blogid);

    var leftcolumn= `<div class="leftcolumn">
    <button id="addNewPost" onclick="openNewBlogForm()" style="width: 100%">Add new</button>`

    for (var b = 0; b < userinblogit.length; b++) {
      var blogi = userinblogit[b];

      leftcolumn +=  
      `<div class="card">
      <h3> ` + blogi.Title + `</h3>
      <h5> Created at: ` + blogi.CreateAt + `</h5>
      <div class="blogbody">
      <div class="fakeimg" style="height: 200px">Image</div>
      <p class="content">Sisältö: ` + blogi.Content + `</p>
      </div>
      <p class="blogLikes">Likes: ` + blogi.amountOfLikes + ` <button>+</button><button>-</button></p>
      <p class="blogCategory">Category: <button>dfg</button></p>
      </div>`
    }

    leftcolumn+= `</div>`
     mainContainer.innerHTML+=leftcolumn;

     mainContainer.innerHTML+=  
     `<div class="rightcolumn">
        <div class="card">
          <h2>About Me</h2>
          <div class="fakeimg" style="height: 100px">Image</div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
          <button id="editAboutMe">Edit</button>
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
    console.log("ffsd");
  }
};

function openNewBlogForm() {
  var popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.innerHTML = 
  `<div id="newBlogPopupoverlay" class="modaloverlay">
  <div id="newBlogPopup">
  <h1>Add new blog</h1>
  <form id="newBlogForm">
  <label for="title"><b>Title</b></label>
    <input type="text" placeholder="Enter title" name="title" required>

    <label for="content"><b>Content</b></label>
    <input type="content" placeholder="Enter content" name="content" required>

    <button type="submit">Add</button>
    <button type="submit" onclick="closeNewBlogForm()">Cancel</button>
  </form>
  </div>
  `;
  document.body.appendChild(popup);
  document.body.style = "overflow: hidden";
}

function closeNewBlogForm() {
  document.body.removeChild(popup);
  document.body.style = "overflow: auto";
}

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
    </li>`;
  }
}

async function renderPopularBlogs() {
  var popularBlogit = await getPopularBlogs();

  for (var b = 0; b < popularBlogit.length; b++) {
    var blogi = popularBlogit[b];

    popularBlogsit.innerHTML +=
      `<li>
      <img></img>
      <h3> ` + blogi.Title + `</h3>
      <p>Likes: ` + blogi.amountOfLikes + `</p>
      <p>User: ` + blogi.UserID + `</p>
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
  }
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
});

navSignup.addEventListener("click", async (evt) => {
  evt.preventDefault();

  navSignup.setAttribute("class", "active");
  navLogin.setAttribute("class", "");
  navHome.setAttribute("class", "");

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