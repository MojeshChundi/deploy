const express = require('express');
//const forgotPwdController = require('../controllers/forgotpwd');
const router = express.Router();

//router.post('/password/forgotpassword', forgotPwdController.forgotMail);

const resetpasswordController = require('../controllers/forgotpwd');

router.get(
  '/updatepassword/:resetpasswordid',
  resetpasswordController.updatepassword
);

router.get('/resetpassword/:id', resetpasswordController.resetpassword);

router.post('/forgotpassword', resetpasswordController.forgotpassword);

module.exports = router;
