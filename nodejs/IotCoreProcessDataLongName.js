'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const deviceId = event.device_id;
  const temperature = event.temperature;
  const humidity = event.humidity;

  console.log(`Received data from device ${deviceId}:`);
  console.log(`Temperature: ${temperature}°C`);
  console.log(`Humidity: ${humidity}%`);

  if (temperature > 30) {
    console.log(`Alert! High temperature detected: ${temperature}°C`);
    // Further actions...
  }

  return {
    statusCode: 200,
    body: JSON.stringify('IoT data processed successfully.')
  };
};
