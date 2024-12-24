'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const s3 = new AWS.S3();
  const bucketName = 'your-bucket-name';
  const expirationDays = 7;

  const now = new Date();
  const expirationDate = new Date(now.getTime() - expirationDays * 24 * 60 * 60 * 1000);

  const objectsResponse = await s3.listObjectsV2({ Bucket: bucketName }).promise();
  const objects = objectsResponse.Contents || [];

  for (const obj of objects) {
    if (obj.LastModified < expirationDate) {
      console.log(`Deleting ${obj.Key} (last modified: ${obj.LastModified})`);
      await s3.deleteObject({ Bucket: bucketName, Key: obj.Key }).promise();
    }
  }

  return {
    statusCode: 200,
    body: 'Expired objects cleaned up.'
  };
};
