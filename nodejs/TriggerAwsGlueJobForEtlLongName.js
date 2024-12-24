'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const glue = new AWS.Glue();
  const jobName = 'your-glue-job-name';

  const response = await glue.startJobRun({ JobName: jobName }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Glue job started with JobRunId: ${response.JobRunId}`)
  };
};
