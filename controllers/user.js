const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.postAddUser =
  ("/user/add-user",
  async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      // scrpting the password
      bcrypt.hash(password, 10, (err, hash) => {
        const data = {
          name: name,
          email: email,
          password: hash,
        };
        User.create(data);
        res.status(201).json({ data: data });
      });
    } catch (err) {
      console.log(err);
    }
  });
exports.logIn =
  ("/user/login",
  async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
      console.log("please enter username And password!!");
    }

    // featching the data from the database

    const user = await User.findOne({ where: { name: name } });
    const userpwd = await User.findAll({ attributes: ["password"] });
    //console.log(userpwd[0].password);
    //console.log(password);

    // cripting he user password with database cripted password

    bcrypt.compare(password, userpwd[0].password, (err, result) => {
      if (err || !user) {
        console.log("incorrect user name or password!");
        res.status(404).json({ mesaage: "incorrect user name or password!" });
      } else {
        console.log("user login successfully!!");
        res.status(201).json({ mesaage: "user login successfully!" });
      }
    });
  });
