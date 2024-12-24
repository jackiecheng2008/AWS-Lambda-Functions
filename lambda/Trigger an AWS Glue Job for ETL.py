import boto3
import json

glue = boto3.client('glue')

def lambda_handler(event, context):
    job_name = 'your-glue-job-name'
    response = glue.start_job_run(JobName=job_name)
    return {
        'statusCode': 200,
        'body': json.dumps(f"Glue job started with JobRunId: {response['JobRunId']}")
    }
