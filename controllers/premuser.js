const Expense = require("../models/expense");
const User = require("../models/user");

exports.premUser =
  ("/user/premuser",
  async (req, res, next) => {
    try {
      const expenses = await Expense.findAll();
      const users = await User.findAll();
      const aggregatedExpense = {};
      expenses.forEach((el) => {
        if (aggregatedExpense[el.userId]) {
          aggregatedExpense[el.userId] =
            +aggregatedExpense[el.userId] + +el.spentAmount;
        } else {
          aggregatedExpense[el.userId] = +el.spentAmount;
        }
      });
      userLeaderDetails = [];
      users.forEach((user) => {
        userLeaderDetails.push(
          { name: user.name, total_cost: aggregatedExpense[user.id] } || 0
        );
      });
      userLeaderDetails.sort((a, b) => {
        return b.total_cost - a.total_cost;
      });
      res.status(201).json({ userDetails: userLeaderDetails });
      console.log(userLeaderDetails);
    } catch (err) {
      res.status(400).json({ message: "premuser route error" });
    }
  });
