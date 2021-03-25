const mongoose = require('mongoose');
const crypto = require('crypto');
const Email = require('../models/emailverification.model');
const nodemailer = require('nodemailer');
let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'verifapplink@gmail.com',
    pass: 'Medieval.1217'
  }
});
let mailDetails = {
  from: 'verifapplink@gmail.com',
  subject: 'Email verification Token',
};
const sendVerificationEmail = async (userId, type, email) => {
  let token = crypto.randomBytes(16).toString('hex');
  let emailVerificationId = new mongoose.mongo.ObjectId()
  let emailVerification = {
    _id: emailVerificationId,
    token: token,
    isValid: true,
    userId: userId,
    type: type
  };
  mailDetails.to = email;
  let url = "http://185.87.252.41?verify=" + Buffer.from(token + "." + type).toString('base64');
  mailDetails.text = "The verification URL is " + url;
  return await mailTransporter.sendMail(mailDetails, async function (err, data) {
    if (err) {
      return false;
    } else {
      const created = await Email.create(emailVerification);
      if (!!created) {
        return true;
      }
      return false;
    }
  });
};

let sendEmailLink = async (userId, email, type) => {
  mailDetails.subject = "Password reset link for you account";
  mailDetails.to = email;
  let url = "http://185.87.252.41/accounts/reset-password?token=" + Buffer.from(userId + "." + type).toString('base64');;
  if (type = 'Manager') {
    url = "http://185.87.252.41/accounts/reset-password?token=" + Buffer.from(userId + "." + type).toString('base64');
  } else if (type = 'Student') {
    url = "http://185.87.252.41/accounts/reset-password?token=" + Buffer.from(userId + "." + type).toString('base64');
  }
  mailDetails.text = "You password reset link is " + url;
  return await mailTransporter.sendMail(mailDetails, async function (err, data) {
    if (err) {
      return false;
    }
    return true;
  });
};

module.exports = { sendVerificationEmail, sendEmailLink };