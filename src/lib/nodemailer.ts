import nodemailer from 'nodemailer'
const nodemailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER_EMAIL,
    pass: process.env.GMAIL_USER_APP_PASSWORD
  }
}
let transport = nodemailer.createTransport(nodemailerConfig)
// nodemailerConfig

const sendMail = async (email: any, { ...props }) => {
  // let testAccount = await nodemailer.createTestAccount();
  const mailOptions = {
    from: process.env.GMAIL_USER_EMAIL, // Sender address
    to: email, // List of recipients
    subject: '', // Subject line
    text: `Your OTP is }` // Plain text body
  }

  const result = await transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err.message)
    } else {
      return info
    }
  })
  return result
}

// module.exports = sendMail
