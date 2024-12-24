import boto3
import json
import os

redshift = boto3.client('redshift-data')

def lambda_handler(event, context):
    bucket_name = event['bucket']
    key = event['key']
    s3_path = f"s3://{bucket_name}/{key}"
    sql_query = f"COPY your_table FROM '{s3_path}' IAM_ROLE 'your-redshift-role' FORMAT AS CSV IGNOREHEADER 1"
    response = redshift.execute_statement(
        ClusterIdentifier='your-redshift-cluster',
        Database='your_database',
        DbUser='your_user',
        Sql=sql_query
    )
    return {
        'statusCode': 200,
        'body': json.dumps(f"Data load started with Statement ID: {response['Id']}")
    }
