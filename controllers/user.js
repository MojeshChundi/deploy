const User = require("../models/user");
const Expense = require("../models/expense");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function generateJwtToken(id) {
  const token = jwt.sign({ id: id }, "secretKey");
  return token;
}
exports.logIn =
  ("/user/login",
  async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
      console.log("please enter username And password!!");
    }

    // featching the data from the database

    const user = await User.findAll({ where: { name: name } });

    console.log(user[0].id);
    //console.log(password);

    // cripting he user password with database cripted password

    bcrypt.compare(password, user[0].password, function (err, result) {
      if (err) {
        console.log("bcrypt problem");
      }
      if (result === false) {
        console.log("incorrect user name or password!");
        res.status(404).json({ message: "incorrect user name or password!" });
      }
      if (result === true) {
        console.log("user login successfully!!");
        res
          .status(201)
          .json({ mesaage: "success", token: generateJwtToken(user[0].id) });
      }
    });
  });

exports.addExpense =
  ("/user/add-Expesnse",
  async (req, res, next) => {
    try {
      console.log(req.body);
      const userid = jwt.verify(req.body.userId, "secretKey");
      const userId = userid.id;
      const spentAmount = req.body.spentAmount;
      const Description = req.body.Description;
      const category = req.body.category;
      const data = await Expense.create({
        spentAmount,
        Description,
        category,
        userId,
      });
      res.status(201).json({ data: data });
    } catch (err) {
      console.log(err);
    }
  });

exports.getExpenses =
  ("/user/get-Expense",
  async (req, res, next) => {
    const data = await Expense.findAll();
    res.status(201).json({ data });
  });

exports.deleteExpense =
  ("/user/delete-Expense",
  async (req, res, next) => {
    try {
      const ExpenseId = req.body.id;
      const expense = await Expense.findById(ExpenseId);
      await expense.destroy();
    } catch (err) {
      console.log(err);
    }
  });
