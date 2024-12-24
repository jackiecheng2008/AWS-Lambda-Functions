const AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  for (const record of event.Records) {
    try {
      // 1. Decode and parse the incoming data from Kinesis
      const data = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
      const jsonData = JSON.parse(data); 

      // 2. Process the data (e.g., filter, aggregate, transform)
      const processedData = processData(jsonData); // Example function call (see below)

      // 3. Store the processed data in DynamoDB
      const params = {
        TableName: 'your-dynamodb-table-name',
        Item: processedData,
      };
      await dynamoDb.put(params).promise();

      console.log('Data successfully processed and stored in DynamoDB:', processedData);

      // 4. (Optional) Trigger alerts or other actions based on data
      if (processedData.someCondition) {
        // Example: Publish an alert to an SNS topic
        // await sns.publish({ 
        //   TopicArn: 'your-sns-topic-arn',
        //   Message: JSON.stringify(processedData) 
        // }).promise();
      }

    } catch (error) {
      console.error('Error processing record:', error);
    }
  }
};

// Example data processing function (customize as needed)
function processData(data) {
  // Perform your data transformations here
  // Example: Extract relevant fields, calculate averages, etc.
  return {
    deviceId: data.deviceId,
    timestamp: data.timestamp,
    temperature: data.temperature,
    // ... other processed data
  };
}