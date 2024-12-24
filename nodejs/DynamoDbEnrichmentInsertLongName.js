'use strict';
const AWS = require('aws-sdk');
const crypto = require('crypto');

module.exports.handler = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const tableName = 'YourTableName';

  const enrichedData = {
    id: crypto.randomUUID(),
    data: event.data || {},
    timestamp: Date.now()
  };

  await dynamoDb.put({ TableName: tableName, Item: enrichedData }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Data inserted with ID: ${enrichedData.id}`)
  };
};
