'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async () => {
  const sagemaker = new AWS.SageMaker();
  const jobName = `training-job-${Date.now()}`;

  const params = {
    TrainingJobName: jobName,
    AlgorithmSpecification: {
      TrainingImage: 'your-training-image',
      TrainingInputMode: 'File'
    },
    RoleArn: process.env.SAGEMAKER_ROLE || 'arn:aws:iam::account-id:role/SageMakerRole',
    InputDataConfig: [
      {
        ChannelName: 'train',
        DataSource: {
          S3DataSource: {
            S3DataType: 'S3Prefix',
            S3Uri: 's3://your-training-data-bucket/path/',
            S3DataDistributionType: 'FullyReplicated'
          }
        },
        ContentType: 'text/csv'
      }
    ],
    OutputDataConfig: {
      S3OutputPath: 's3://your-output-bucket/path/'
    },
    ResourceConfig: {
      InstanceType: 'ml.m4.xlarge',
      InstanceCount: 1,
      VolumeSizeInGB: 10
    },
    StoppingCondition: {
      MaxRuntimeInSeconds: 3600
    }
  };

  const response = await sagemaker.createTrainingJob(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(`Started training job ${jobName}`)
  };
};
