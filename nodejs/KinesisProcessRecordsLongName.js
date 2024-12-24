'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    const payload = Buffer.from(record.kinesis.data, 'base64').toString('utf-8');
    console.log('Data from Kinesis:', payload);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Data processed from Kinesis.')
  };
};
