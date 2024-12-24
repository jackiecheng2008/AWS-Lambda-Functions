
'use strict';
const AWS = require('aws-sdk');
// const parse = require('csv-parse/lib/sync');
// const { stringify } = require('csv-stringify/sync');

module.exports.handler = async (event) => {
  const s3 = new AWS.S3();
  const bucket = event.bucket;
  const key = event.key;
  const outputKey = 'transformed-data/output.csv';

  // 1) Download the CSV
  const s3Data = await s3.getObject({ Bucket: bucket, Key: key }).promise();
  const csvContent = s3Data.Body.toString('utf-8');

  // 2) Parse & transform (placeholder)
  // const records = parse(csvContent, { columns: true });
  // records.forEach(row => {
  //   row.new_column = Number(row.existing_column) * 2;
  // });
  // const outputCsv = stringify(records, { header: true });

  // For demonstration, transform by converting to uppercase:
  const transformed = csvContent.toUpperCase();

  // 3) Upload transformed data
  await s3.putObject({
    Bucket: bucket,
    Key: outputKey,
    Body: transformed
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify('Data transformed and saved successfully.')
  };
};
