'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const name = event.queryStringParameters?.name || 'Guest';
  const responseBody = { message: `Hello, ${name}! Welcome to the API.` };

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  };
};
