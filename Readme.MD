AWS Lambda Functions – Node.js Collection
This repository contains 36 AWS Lambda functions implemented in Node.js, each demonstrating a different AWS service interaction or use case. They are separated into individual files for clarity, each exporting a single handler.

Table of Contents (Index of Functions)
01_nodejsFunctionRestApiEndpointWithApiGatewayLongName.js

Description: Basic REST API endpoint using API Gateway. Returns a greeting message with optional query parameter.
Keywords: API Gateway, REST, HTTP, greeting
02_nodejsFunctionTriggerAwsGlueJobForEtlLongName.js

Description: Starts an AWS Glue job for ETL tasks.
Keywords: Glue, ETL, data processing
03_nodejsFunctionS3EventTriggerLogFileUploadLongName.js

Description: Logs file uploads to an S3 bucket when triggered by S3 events.
Keywords: S3 event, file upload, logging
04_nodejsFunctionS3ReadTransformSaveLongName.js

Description: Reads content from a source S3 bucket, transforms it (e.g., uppercase), then saves to a destination S3 bucket.
Keywords: S3, transform, copy, uppercase
05_nodejsFunctionComprehendSentimentAnalysisLongName.js

Description: Uses Amazon Comprehend to detect sentiment from a given text.
Keywords: Comprehend, sentiment, NLP
06_nodejsFunctionTextractExtractTextLongName.js

Description: Leverages Amazon Textract to extract text (TABLES, FORMS) from documents in S3.
Keywords: Textract, OCR, document processing
07_nodejsFunctionRedshiftLoadCsvDataLongName.js

Description: Runs a Redshift COPY command to load CSV data from S3 into Redshift.
Keywords: Redshift, COPY, data warehouse, CSV
08_nodejsFunctionBasicHelloWorldLongName.js

Description: A simple “Hello, World!” Lambda, returning static text.
Keywords: hello world, basic, test
09_nodejsFunctionDynamoDbInsertDataLongName.js

Description: Inserts an item into a DynamoDB table (includes a random UUID).
Keywords: DynamoDB, insert, UUID
10_nodejsFunctionScheduledCloudWatchLongName.js

Description: Logs a message (and the current time) when triggered on a schedule (CloudWatch Events).
Keywords: CloudWatch, scheduled, logging
11_nodejsFunctionSesSendEmailLongName.js

Description: Sends an email using Amazon SES (Simple Email Service).
Keywords: SES, email, notification
12_nodejsFunctionKinesisProcessRecordsLongName.js

Description: Processes records from an Amazon Kinesis data stream (base64-decoded).
Keywords: Kinesis, stream, real-time
13_nodejsFunctionRdsQueryLongName.js

Description: Demonstrates a placeholder for querying an RDS database (using mysql2 or similar).
Keywords: RDS, SQL, database, mysql2
14_nodejsFunctionS3ImageResizeLongName.js

Description: Downloads an image from S3, resizes it (using sharp—commented out), and re-uploads.
Keywords: S3, image, resize, sharp
15_nodejsFunctionSnsProcessNotificationsLongName.js

Description: Processes SNS notifications, printing out the message payload.
Keywords: SNS, notification, message
16_nodejsFunctionS3GeneratePresignedUrlLongName.js

Description: Generates a time-limited pre-signed URL for an S3 object.
Keywords: S3, pre-signed URL, temporary access
17_nodejsFunctionSecretsManagerRetrieveLongName.js

Description: Retrieves secrets from AWS Secrets Manager, handling both string and binary secrets.
Keywords: Secrets Manager, credentials, secure
18_nodejsFunctionTranslateTextLongName.js

Description: Uses Amazon Translate to translate text into a target language.
Keywords: Translate, NLP, language, localization
19_nodejsFunctionRekognitionDetectTextLongName.js

Description: Detects text in images via Amazon Rekognition.
Keywords: Rekognition, text detection, image
20_nodejsFunctionIotCoreProcessDataLongName.js

Description: Processes IoT data (e.g., temperature, humidity), logs, and triggers alerts if necessary.
Keywords: IoT Core, sensor data, alert
21_nodejsFunctionDynamoDbEnrichmentInsertLongName.js

Description: Enriches and inserts data (with timestamp) into a DynamoDB table.
Keywords: DynamoDB, enrich, insert, timestamp
22_nodejsFunctionS3CleanupExpiredLongName.js

Description: Cleans up (deletes) expired objects in an S3 bucket, based on last modified date.
Keywords: S3, cleanup, expiration, housekeeping
23_nodejsFunctionRekognitionAnalyzeVideoLongName.js

Description: Starts label detection on an S3-stored video using Amazon Rekognition.
Keywords: Rekognition, video, label detection
24_nodejsFunctionFirehoseProcessRecordsLongName.js

Description: Processes and transforms data from a Kinesis Firehose stream (Base64-encoded).
Keywords: Kinesis Firehose, transform, streaming
25_nodejsFunctionDynamoDbArchiveExpiredLongName.js

Description: Archives expired (TTL) DynamoDB records into S3 upon a “REMOVE” event.
Keywords: DynamoDB TTL, archive, S3
26_nodejsFunctionEbsSnapshotBackupLongName.js

Description: Creates EBS snapshots for specified EC2 instances and tags them with a retention period.
Keywords: EC2, EBS, snapshot, backup
27_nodejsFunctionSageMakerInvokeEndpointLongName.js

Description: Calls a SageMaker endpoint for real-time inference and returns the prediction.
Keywords: SageMaker, inference, ML, real-time
28_nodejsFunctionConfigRuleEvaluateSecurityGroupLongName.js

Description: Evaluates a security group compliance for an AWS Config rule.
Keywords: AWS Config, compliance, security group
29_nodejsFunctionRdsCopySnapshotToS3LongName.js

Description: Copies an RDS snapshot to S3 (export task).
Keywords: RDS, snapshot, export, S3
30_nodejsFunctionElbCleanupUnusedLongName.js

Description: Lists all ELBs (Elastic Load Balancers) and deletes any that do not have target groups.
Keywords: ELB, cleanup, unused, housekeeping
31_nodejsFunctionSecretsManagerRotateLongName.js

Description: Initiates rotation of a secret stored in AWS Secrets Manager.
Keywords: Secrets Manager, rotate, credentials
32_nodejsFunctionS3BatchOperationsLongName.js

Description: Demonstrates batch file operations in an S3 bucket (e.g., delete small files).
Keywords: S3, batch, delete
33_nodejsFunctionKinesisAggregateDataLongName.js

Description: Aggregates data from a Kinesis stream (computes total, count, and average).
Keywords: Kinesis, aggregation, real-time, metrics
34_nodejsFunctionSageMakerTriggerTrainingJobLongName.js

Description: Triggers a SageMaker training job with specified parameters.
Keywords: SageMaker, training, machine learning
35_nodejsFunctionSageMakerPredictAndStoreLongName.js

Description: Sends data to a SageMaker endpoint for inference and stores the result in DynamoDB.
Keywords: SageMaker, DynamoDB, inference, prediction
36_nodejsFunctionEtlWithCsvParseLongName.js

Description: Demonstrates ETL operations on CSV data from S3 (placeholder for CSV parsing).
Keywords: S3, CSV, ETL, transform
Setup and Usage
Install Dependencies
Each Lambda function uses the AWS SDK (pre-installed in Lambda environments).
Some functions may require additional packages (e.g., sharp for image resizing, mysql2 for RDS queries, or csv-parse and csv-stringify for CSV ETL).
If you plan to use those functions, install them locally and include them in your deployment packages. For example:

bash
Copy code
npm install sharp mysql2 csv-parse csv-stringify
Deployment

Zip each file with its dependencies (if any) to create a separate Lambda deployment package.
In the AWS Lambda console (or via IaC tools), create a new function for each file.
Configure the Handler as <filename>.handler, for example:
Handler: 01_nodejsFunctionRestApiEndpointWithApiGatewayLongName.handler
Ensure the Lambda’s IAM role has the correct permissions for the services it needs to access (e.g., S3, DynamoDB, Glue, Comprehend, etc.).
Configuring Triggers

For API Gateway: Create or configure an API, then set the Lambda integration to the appropriate function.
For S3 events: In the S3 console, enable event notifications pointing to the desired Lambda.
For CloudWatch Events: Configure a scheduled event (cron or rate expression) to invoke the function.
For Kinesis streams, SNS, SQS: Configure the respective event source mapping or subscription.
Environment Variables

Some functions rely on environment variables (e.g., DB_HOST, DB_USER, SAGEMAKER_ENDPOINT).
In the Lambda console, under Configuration → Environment variables, set these values as needed.
Testing

You can test each function manually in the Lambda console by providing an appropriate event JSON.
Adjust or remove placeholders in code to match your actual environment.
Security Considerations

Rotate or secure any credentials (Secrets Manager usage is recommended).
Grant only the minimum permissions needed in IAM roles.