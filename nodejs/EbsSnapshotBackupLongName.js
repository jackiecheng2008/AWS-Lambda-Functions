'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const ec2 = new AWS.EC2();
  const retentionDays = 7;

  const instances = ['i-0123456789abcdef0', 'i-0abcdef1234567890'];

  for (const instanceId of instances) {
    const volumesResult = await ec2.describeVolumes({
      Filters: [{ Name: 'attachment.instance-id', Values: [instanceId] }]
    }).promise();

    for (const volume of volumesResult.Volumes) {
      const snapshot = await ec2.createSnapshot({
        VolumeId: volume.VolumeId,
        Description: `Backup of ${volume.VolumeId} for instance ${instanceId} on ${new Date().toISOString()}`
      }).promise();

      await ec2.createTags({
        Resources: [snapshot.SnapshotId],
        Tags: [{ Key: 'Retention', Value: String(retentionDays) }]
      }).promise();

      console.log(`Snapshot ${snapshot.SnapshotId} created for volume ${volume.VolumeId}`);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('EBS Snapshots created.')
  };
};
