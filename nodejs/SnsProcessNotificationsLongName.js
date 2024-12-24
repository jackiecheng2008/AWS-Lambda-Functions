'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    const snsMessage = record.Sns.Message;
    console.log(`Received SNS message: ${snsMessage}`);
    // Additional processing logic...
  }

  return {
    statusCode: 200,
    body: JSON.stringify('SNS message processed successfully.')
  };
};
