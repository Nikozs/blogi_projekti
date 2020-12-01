'use strict';
const { validationResult } = require('express-validator');
const blogModel = require('../models/blogModel');

const blogs = blogModel.blogs;

const blog_list_get = async (req, res) => {
  const blogs = await blogModel.getAllBlogs();
  res.json(blogs);
};

const blog_list_getrandomblogs = async (req, res) => {
  const blogs = await blogModel.getRandomBlogs();
  res.json(blogs);
};

const blog_list_getbysearch = async (req, res) => {
  const searchparam = req.params.searchparam;
  const blogs = await blogModel.getBlogBySearchParam(searchparam);
  res.json(blogs);
};

const blog_get = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.getBlogById(id);
  res.json(blogi);
};

const blog_AddLike = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.addLike(id);
  res.json(blogi);
};

const blog_RemoveLike = async (req, res) => {
  const id = req.params.id;
  const blogi = await blogModel.removeLike(id);
  res.json(blogi);
};

module.exports = {
  blog_list_get,
  blog_get,
  blog_list_getbysearch,
  blog_list_getrandomblogs,
  blog_AddLike,
  blog_RemoveLike
};