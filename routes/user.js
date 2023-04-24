const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

//ADD USER TO THE DATA BASE
router.post("/user/add-user", userController.postAddUser);

module.exports = router;
