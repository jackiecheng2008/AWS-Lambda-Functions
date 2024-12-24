'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const rds = new AWS.RDS();
  const snapshotIdentifier = 'your-snapshot-id';
  const bucketName = 'your-s3-bucket';

  const params = {
    ExportTaskIdentifier: `export-${snapshotIdentifier}`,
    SourceArn: `arn:aws:rds:region:account-id:snapshot:${snapshotIdentifier}`,
    S3BucketName: bucketName,
    IamRoleArn: 'arn:aws:iam::account-id:role/RDSExportRole'
  };

  const response = await rds.startExportTask(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Started export task for RDS snapshot ${snapshotIdentifier}`)
  };
};
