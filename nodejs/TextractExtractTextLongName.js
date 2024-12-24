'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const textract = new AWS.Textract();
  const bucket = event.bucket;
  const documentKey = event.document_key;

  const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: documentKey
      }
    },
    FeatureTypes: ['TABLES', 'FORMS']
  };

  const response = await textract.analyzeDocument(params).promise();
  const extractedText = [];

  for (const block of response.Blocks) {
    if (block.BlockType === 'LINE') {
      extractedText.push(block.Text);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ extracted_text: extractedText.join(' ') })
  };
};
