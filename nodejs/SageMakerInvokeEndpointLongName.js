'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const sagemakerRuntime = new AWS.SageMakerRuntime();
  const endpointName = 'your-sagemaker-endpoint';

  const payload = JSON.stringify(event.data || {});
  const response = await sagemakerRuntime.invokeEndpoint({
    EndpointName: endpointName,
    ContentType: 'application/json',
    Body: payload
  }).promise();

  const responseBody = JSON.parse(response.Body.toString('utf-8'));
  return {
    statusCode: 200,
    body: JSON.stringify({ prediction: responseBody })
  };
};
