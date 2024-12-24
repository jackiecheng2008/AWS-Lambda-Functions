import boto3
import pandas as pd
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket = event['bucket']
    key = event['key']
    output_key = 'transformed-data/output.csv'
    # Load data from S3
    response = s3.get_object(Bucket=bucket, Key=key)
    data = pd.read_csv(response['Body'])
    # Perform transformation
    data['new_column'] = data['existing_column'] * 2
    # Save transformed data back to S3
    output_buffer = io.StringIO()
    data.to_csv(output_buffer, index=False)
    s3.put_object(Bucket=bucket, Key=output_key, Body=output_buffer.getvalue())
