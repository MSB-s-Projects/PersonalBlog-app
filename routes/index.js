// importing express
const express = require("express");
// importing body-parser
const bodyParser = require("body-parser");
// importing ejs
const ejs = require("ejs");
// importing lodash
const _ = require("lodash");
var router = express.Router();

// creating starting content for html files
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// using the bodyParser in urlEncoder mode
router.use(bodyParser.urlencoded({ extended: true }));

// creating a global variable posts
const posts = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  // rendering home.ejs
  res.render("home", {
    homePara: homeStartingContent,
    posts: posts,
    _: _,
  });
});

// get function for "/about" route
router.get("/about", (req, res, next) => {
  // rendering about.ejs
  res.render("about", { aboutPara: aboutContent });
});

// get function for "/contact" route
router.get("/contact", (req, res) => {
  // rendering contact.ejs
  res.render("contact", { contactPara: contactContent });
});

// get function for "/compose" route
router.get("/compose", (req, res) => {
  // rendering compose.ejs
  res.render("compose");
});

// post function for "/compose" route
router.post("/compose", (req, res) => {
  // creating an object called post
  const post = {
    postTitle: req.body.title,
    postBody: req.body.postB,
  };
  // pushing object to global variable
  posts.push(post);
  // redirecting to root route
  res.redirect("/");
});

// get function for "/post/:postName" route
router.get("/posts/:postName", (req, res) => {
  // checking if the article exists
  let found = false;

  posts.forEach((post) => {
    if (_.kebabCase(post.postTitle) === req.params.postName) {
      found = true;
      // if article found render post.ejs
      res.render("post", {
        title: post.postTitle,
        content: post.postBody,
      });
    }
  });

  // if not found render post.ejs with 404 error page
  if (!found) {
    res.render("post", {
      title: "404",
      content: "Error! Requested post not found.",
    });
  }
});



module.exports = router;
