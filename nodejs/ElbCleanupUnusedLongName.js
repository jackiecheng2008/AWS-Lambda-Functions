'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const elb = new AWS.ELBv2();
  const loadBalancersResponse = await elb.describeLoadBalancers().promise();
  const loadBalancers = loadBalancersResponse.LoadBalancers;

  for (const lb of loadBalancers) {
    const targetGroupsResponse = await elb.describeTargetGroups({
      LoadBalancerArn: lb.LoadBalancerArn
    }).promise();

    if (targetGroupsResponse.TargetGroups.length === 0) {
      await elb.deleteLoadBalancer({ LoadBalancerArn: lb.LoadBalancerArn }).promise();
      console.log(`Deleted unused ELB: ${lb.LoadBalancerName}`);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Checked and deleted unused ELBs.')
  };
};
