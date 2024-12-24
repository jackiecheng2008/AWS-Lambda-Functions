'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const secretsManager = new AWS.SecretsManager();
  const secretName = process.env.SECRET_NAME || 'your-secret-name';

  const response = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  let secretData;

  if ('SecretString' in response) {
    secretData = response.SecretString;
  } else {
    // For binary secrets
    secretData = Buffer.from(response.SecretBinary, 'base64').toString('ascii');
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ secretData })
  };
};
