'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const s3 = new AWS.S3();
  const bucketName = 'your-bucket-name';
  const objectKey = 'path/to/your-object.jpg';

  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: bucketName,
    Key: objectKey,
    Expires: 3600 // 1 hour
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ url })
  };
};
