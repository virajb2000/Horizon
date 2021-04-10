const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ftc16606@gmail.com',
    pass: 'TechKnights12' // naturally, replace both with your real credentials or an application-specific password
  }
});

const mailOptions = {
  from: 'tejasp2022@gmail.com',
  to: 'ftc16606@gmail.com',
  subject: 'Test Email',
  text: 'Testing automated email'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});