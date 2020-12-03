"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllBlogs = async () => {
  try {
    const [rows] = await promisePool.query("SELECT * FROM post");
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const getBlogById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM post WHERE ID = ?",
      [id]
    );
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const getBlogsByUserId = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM post WHERE UserID = ?",
      [id]
    );
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const getBlogBySearchParam = async (searchparam) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM post WHERE content like ("%' +
        searchparam +
        '%") or title like ("%' +
        searchparam +
        '%")'
    );
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const getRandomBlogs = async () => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM post ORDER BY RAND() LIMIT 10"
    );
    console.log("rows", rows);
    return rows;
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const addLike = async (id) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "UPDATE post SET amountOfLikes=amountOfLikes+1 WHERE ID = ?",
      [id]
    );
    console.log("rows", rows);
    return await getBlogById(id);
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const removeLike = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "UPDATE post SET amountOfLikes=amountOfLikes-1 WHERE ID = ? AND amountOfLikes>0",
      [id] 
    );
    console.log("rows", rows);
    return await getBlogById(id);
  } catch (e) {
    console.log("blogModel error:", e.message);
    return { error: "Error" };
  }
};

const addBlog = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO post (Title, CreateAt, Content) VALUES (?, NOW(), ?)',
        params
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('blogModel error', e.message);
    return {error: 'Error'};
  }
}

const updateBlog = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE post SET Title = ?, UpdateAt = NOW(), Content = ? WHERE ID = ?',
        params
    );
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('blogModel error', e.message);
    return {error: 'Error'};
  }
}

const deleteBlog = async (id) => {
  try {
    const [rows] = await promisePool.execute('DELETE FROM post WHERE ID = ?',
        [id]);
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.log('blogModel error', e.message);
    return {error: 'Error'};
  }
}



module.exports = {
  getAllBlogs,
  getBlogById,
  getBlogBySearchParam,
  getRandomBlogs,
  addLike,
  removeLike,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlogsByUserId
};
