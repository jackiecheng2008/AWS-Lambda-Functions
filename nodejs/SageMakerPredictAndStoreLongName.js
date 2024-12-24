'use strict';
const AWS = require('aws-sdk');
const crypto = require('crypto');

module.exports.handler = async (event) => {
  const sagemakerRuntime = new AWS.SageMakerRuntime();
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const endpointName = process.env.SAGEMAKER_ENDPOINT || 'your-endpoint';
  const tableName = process.env.DYNAMODB_TABLE || 'YourTableName';

  const payload = JSON.stringify(event.data || {});
  const inferenceResponse = await sagemakerRuntime.invokeEndpoint({
    EndpointName: endpointName,
    ContentType: 'application/json',
    Body: payload
  }).promise();

  const prediction = JSON.parse(inferenceResponse.Body.toString('utf-8'));
  const itemId = crypto.randomUUID();

  await dynamoDb.put({
    TableName: tableName,
    Item: {
      id: itemId,
      prediction,
      input_data: event.data
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ id: itemId, prediction })
  };
};
