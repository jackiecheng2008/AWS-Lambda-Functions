'use strict';

module.exports.handler = async () => {
  const now = new Date();
  console.log(`Scheduled Lambda function ran at: ${now.toISOString()}`);

  return {
    statusCode: 200,
    body: 'Scheduled Lambda function executed successfully.'
  };
};
