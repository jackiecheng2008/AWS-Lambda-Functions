'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  let totalValue = 0;
  let count = 0;

  for (const record of event.Records) {
    const payloadStr = Buffer.from(record.kinesis.data, 'base64').toString('utf-8');
    const payloadObj = JSON.parse(payloadStr);

    totalValue += payloadObj.value || 0;
    count += 1;
  }

  const avgValue = count > 0 ? totalValue / count : 0;
  return {
    statusCode: 200,
    body: JSON.stringify({ count, average_value: avgValue })
  };
};
