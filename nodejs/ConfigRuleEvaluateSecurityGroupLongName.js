'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const configService = new AWS.ConfigService();
  const invokingEvent = JSON.parse(event.invokingEvent);
  const configurationItem = invokingEvent.configurationItem;
  const securityGroups = configurationItem.configuration.securityGroups;

  const compliance = securityGroups.includes('sg-01234567') ? 'COMPLIANT' : 'NON_COMPLIANT';

  await configService.putEvaluations({
    Evaluations: [
      {
        ComplianceResourceType: configurationItem.resourceType,
        ComplianceResourceId: configurationItem.resourceId,
        ComplianceType: compliance,
        OrderingTimestamp: configurationItem.configurationItemCaptureTime
      }
    ],
    ResultToken: event.resultToken
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify('Config rule evaluated.')
  };
};
