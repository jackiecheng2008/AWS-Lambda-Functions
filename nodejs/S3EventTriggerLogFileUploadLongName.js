'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;
    console.log(`File uploaded: ${key} in bucket: ${bucket}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('File upload processed successfully.')
  };
};
