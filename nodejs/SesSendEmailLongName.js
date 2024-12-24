'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const ses = new AWS.SES();

  const params = {
    Source: 'sender@example.com',
    Destination: {
      ToAddresses: ['recipient@example.com']
    },
    Message: {
      Subject: { Data: 'Lambda Notification' },
      Body: {
        Text: { Data: 'This is a test email from AWS Lambda (Node.js version).' }
      }
    }
  };

  const response = await ses.sendEmail(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Email sent successfully with MessageId: ${response.MessageId}`)
  };
};
