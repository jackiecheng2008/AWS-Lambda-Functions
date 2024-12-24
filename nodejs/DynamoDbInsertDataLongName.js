'use strict';
const AWS = require('aws-sdk');
const crypto = require('crypto');

module.exports.handler = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const tableName = 'YourTableName';

  const item = {
    id: crypto.randomUUID(),
    name: event.name || 'Unknown',
    age: event.age || 0
  };

  await dynamoDb.put({ TableName: tableName, Item: item }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(`Inserted item with ID: ${item.id}`)
  };
};
