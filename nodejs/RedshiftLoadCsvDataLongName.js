'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const redshiftData = new AWS.RedshiftData();
  const bucketName = event.bucket;
  const key = event.key;

  const s3Path = `s3://${bucketName}/${key}`;
  const sqlQuery = `
    COPY your_table 
    FROM '${s3Path}' 
    IAM_ROLE 'your-redshift-role' 
    FORMAT AS CSV 
    IGNOREHEADER 1
  `;

  const params = {
    ClusterIdentifier: 'your-redshift-cluster',
    Database: 'your_database',
    DbUser: 'your_user',
    Sql: sqlQuery
  };

  const response = await redshiftData.executeStatement(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Data load started with Statement ID: ${response.Id}`)
  };
};
