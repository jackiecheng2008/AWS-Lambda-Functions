'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const s3 = new AWS.S3();
  const sourceBucket = 'source-bucket-name';
  const destinationBucket = 'destination-bucket-name';

  for (const record of event.Records) {
    const key = record.s3.object.key;

    // Read the file from S3
    const sourceData = await s3.getObject({ Bucket: sourceBucket, Key: key }).promise();
    const originalContent = sourceData.Body.toString('utf-8');

    // Transform the content (uppercase example)
    const transformedContent = originalContent.toUpperCase();

    // Save the transformed file to the destination bucket
    await s3.putObject({
      Bucket: destinationBucket,
      Key: key,
      Body: transformedContent
    }).promise();
  }

  return {
    statusCode: 200,
    body: 'File transformation completed and saved to destination bucket.'
  };
};
