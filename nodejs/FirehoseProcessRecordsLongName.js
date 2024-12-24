'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const output = [];

  for (const record of event.records) {
    const payload = Buffer.from(record.data, 'base64').toString('utf-8');
    const dataObj = JSON.parse(payload);

    // Example transformation
    dataObj.processed_timestamp = Date.now();

    const transformedDataStr = JSON.stringify(dataObj) + '\n';
    output.push({
      recordId: record.recordId,
      result: 'Ok',
      data: Buffer.from(transformedDataStr).toString('base64')
    });
  }

  return { records: output };
};
