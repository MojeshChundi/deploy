const User = require("../models/user");

exports.postAddUser =
  ("/user/add-user",
  async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const data = User.create({
        name: name,
        email: email,
        password: password,
      });
      res.status(201).json({ data: data });
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
    const user = await User.findOne({ where: { name: name } });

    if (!user) {
      console.log("incorrect user name or password!");
    } else {
      console.log("user login successfully!!");
    }
  });
