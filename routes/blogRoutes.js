"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const { body } = require("express-validator");
const router = express.Router();
const blogController = require("../controllers/blogController");
const multer = require('multer');


const injectFile = (req, res, next) => {
  if (req.file) {
    req.body.mimetype = req.file.mimetype;
  }
  next();
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.get("/", blogController.blog_list_get);
router.get("/randomblogs", blogController.blog_list_getrandomblogs);
router.get("/ByUser/:id", blogController.blog_list_getByUserId);

router.get("/:id", blogController.blog_get);
router.get("/search/:searchparam", blogController.blog_list_getbysearch);
const upload = multer({ dest: "./uploads/", fileFilter });

router.get("/addlike/:id", blogController.blog_AddLike);
router.get("/removelike/:id", blogController.blog_RemoveLike);

module.exports = router;
