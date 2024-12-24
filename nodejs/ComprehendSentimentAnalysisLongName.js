'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const comprehend = new AWS.Comprehend();
  const text = event.text || 'I am very happy with this service!';

  const params = {
    Text: text,
    LanguageCode: 'en'
  };
  const response = await comprehend.detectSentiment(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      sentiment: response.Sentiment,
      sentimentScore: response.SentimentScore
    })
  };
};
