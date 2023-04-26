const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.Authenticate = (req, res, next) => {
  const userId = User.findAll({ where: {} });
};
