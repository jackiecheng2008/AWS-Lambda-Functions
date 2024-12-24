'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const rekognition = new AWS.Rekognition();
  const bucket = event.bucket;
  const imageKey = event.key;

  const params = {
    Image: {
      S3Object: { Bucket: bucket, Name: imageKey }
    }
  };

  const response = await rekognition.detectText(params).promise();
  const detectedTexts = response.TextDetections.map(det => det.DetectedText);

  return {
    statusCode: 200,
    body: JSON.stringify({ detected_texts: detectedTexts })
  };
};
