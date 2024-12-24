'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const secretsManager = new AWS.SecretsManager();
  const secretArn = event.SecretId;

  const response = await secretsManager.rotateSecret({ SecretId: secretArn }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Secret rotation initiated for ${secretArn}`)
  };
};
