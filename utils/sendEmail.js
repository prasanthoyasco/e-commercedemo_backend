const nodemailer = require('nodemailer');
require('dotenv').config();
console.log('SMTP USER:', process.env.BREVO_USER);
console.log('SMTP PASS:', process.env.BREVO_PASS);


let transporter;

const initTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_USER, // Brevo SMTP email
        pass: process.env.BREVO_PASS  // Brevo SMTP key
      }
    });
  }
};

const sendEmail = async (to, subject, text) => {
  if (!transporter) initTransporter();

  const mailOptions = {
    from: `"ShopNow" <prasanth.atelier@gmail.com>`,
    to,
    subject,
    text
  };

  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail;
