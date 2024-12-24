'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const s3 = new AWS.S3();
  const archiveBucket = 'your-archive-bucket';

  for (const record of event.Records) {
    if (record.eventName === 'REMOVE') {
      const oldImage = record.dynamodb.OldImage;
      const keyValue = oldImage.id.S;

      await s3.putObject({
        Bucket: archiveBucket,
        Key: `archive/${keyValue}.json`,
        Body: JSON.stringify(oldImage)
      }).promise();
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Archived expired records to S3.')
  };
};
