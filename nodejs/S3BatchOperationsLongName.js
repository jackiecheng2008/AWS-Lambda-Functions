'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const s3 = new AWS.S3();
  const bucketName = 'your-bucket-name';

  const listResponse = await s3.listObjectsV2({ Bucket: bucketName }).promise();
  const objectsToDelete = [];

  for (const obj of (listResponse.Contents || [])) {
    // Example: delete small files (<1 KB)
    if (obj.Size < 1024) {
      objectsToDelete.push({ Key: obj.Key });
    }
  }

  if (objectsToDelete.length > 0) {
    await s3.deleteObjects({
      Bucket: bucketName,
      Delete: { Objects: objectsToDelete }
    }).promise();
    console.log(`Deleted ${objectsToDelete.length} small files from ${bucketName}`);
  }

  return {
    statusCode: 200,
    body: 'Batch operation completed.'
  };
};
