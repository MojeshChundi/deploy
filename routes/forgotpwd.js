const express = require('express');
const forgotPwdController = require('../controllers/forgotpwd');
const router = express.Router();

router.post('/password/forgotpassword', forgotPwdController.forgotMail);

module.exports = router;
