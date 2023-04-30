const jwt = require('jsonwebtoken');
const Expense = require('../models/expense');
const User = require('../models/user');
require('dotenv').config();

exports.addExpense =
  ('/user/add-Expesnse',
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const spentAmount = req.body.spentAmount;
      const Description = req.body.Description;
      const category = req.body.category;
      const data = await Expense.create({
        spentAmount,
        Description,
        category,
        userId,
      });
      const totalAmount = Number(req.user.totalExpense) + Number(spentAmount);
      await User.update(
        { totalExpense: totalAmount },
        { where: { id: userId } }
      );

      res.status(201).json({ data: data });
    } catch (err) {
      console.log(err);
    }
  });

exports.getExpenses =
  ('/user/get-Expense',
  async (req, res, next) => {
    const data = await Expense.findAll({ where: { userId: req.user.id } });
    res.status(201).json({ data });
  });

exports.deleteExpense =
  ('/user/delete-Expense',
  async (req, res, next) => {
    try {
      const ExpenseId = req.body.id;
      const expense = await Expense.findById(ExpenseId);
      await expense.destroy();
    } catch (err) {
      console.log(err);
    }
  });
