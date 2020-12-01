'use strict';
const userModel = require('../models/userModel');

const users = userModel.users;

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get = async (req, res) => {
  const id = req.params.ID;
  const useri = await userModel.getUserById(id);
  delete useri.password;
  res.json(useri);
};

module.exports = {
  user_list_get,
  user_get,
};