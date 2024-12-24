'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const rekognition = new AWS.Rekognition();
  const bucket = event.bucket;
  const videoKey = event.video_key;

  const params = {
    Video: { S3Object: { Bucket: bucket, Name: videoKey } },
    NotificationChannel: {
      SNSTopicArn: 'arn:aws:sns:region:account-id:YourSNSTopic',
      RoleArn: 'arn:aws:iam::account-id:role/RekognitionRole'
    }
  };

  const response = await rekognition.startLabelDetection(params).promise();
  const jobId = response.JobId;
  console.log(`Video analysis started with Job ID: ${jobId}`);

  return {
    statusCode: 200,
    body: JSON.stringify(`Video analysis started with Job ID: ${jobId}`)
  };
};
