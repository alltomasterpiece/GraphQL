const AWS = require('aws-sdk');
const config = require('./awsconfig');

module.exports = new AWS.S3(config.s3);