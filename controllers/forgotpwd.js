//Include the Sendinblue library\
require('dotenv').config();
const Sib = require('sib-api-v3-sdk');

exports.forgotMail =
  ('/password/forgotpassword',
  (req, res, next) => {
    // console.log(';;;;;;;;;;;;;', process.env.API_KEY);
    const email = req.body.email;
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];

    apiKey.apiKey = process.env.API_KEY;

    const transEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
      email: 'mojeshchundi5432@gmail.com',
    };

    const recievers = [
      {
        email: email,
      },
    ];
    transEmailApi
      .sendTransacEmail({
        sender,
        to: recievers,
        subject: 'update your email password!',
        textContent: 'update your password !',
      })
      .then(() => console.log('mailsent'))
      .catch((err) => console.log(err));
  });
