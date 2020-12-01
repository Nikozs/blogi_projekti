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

async function renderRandomBlogs() {
  var randomBlogit = await getRandomBlogs();

  for (var b = 0; b < randomBlogit.length; b++) {
    var blogi = randomBlogit[b];

    randomBlogsit.innerHTML += `<li>
                                <img></img>
                                <h3> ` + blogi.Title + `</h3>
                                <p>Likes: `+ blogi.amountOfLikes + `</p>
                                <p>User: `+ blogi.UserID + `</p>
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
  frontpageContainer.style.display = "none";
}

/*function renderOpenedBlog() {

}*/

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

  // save token
  sessionStorage.setItem("token", json.token);

  //show/hide
  loginForm.style.display = "none";

  getUsers();
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

    // show/hide
    loginForm.style.display = "none";
    navLogout.style.display = "block";
    navLogin.style.display = "none";
    navSignup.style.display = "none";
    frontpageContainer.style.display = "block";
    signupForm.style.display = "none";
    searchResults.style.display = "none";

    getUsers();
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
    alert("You have logged out");

    // show/hide
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

// when app starts, check if token exists and hide login form, show logout button and main content, get cats and users
if (sessionStorage.getItem("token")) {
  frontpageContainer.style.display = "block";
  loginForm.style.display = "none";
  signupForm.style.display = "none";
  navLogout.style.display = "block";
  navLogin.style.display = "none";
  navSignup.style.display = "none";
  getUsers();
}
