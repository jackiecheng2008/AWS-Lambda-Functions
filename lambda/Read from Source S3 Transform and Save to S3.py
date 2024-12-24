import boto3

s3 = boto3.client('s3')
source_bucket = 'source-bucket-name'
destination_bucket = 'destination-bucket-name'

def lambda_handler(event, context):
    # Get the uploaded file information from event
    for record in event['Records']:
        key = record['s3']['object']['key']

        # Read the file from S3
        response = s3.get_object(Bucket=source_bucket, Key=key)
        content = response['Body'].read().decode('utf-8')

        # Transform the content
        transformed_content = content.upper()

        # Save the transformed file to the destination bucket
        s3.put_object(Bucket=destination_bucket, Key=key, Body=transformed_content)

    return {
        'statusCode': 200,
        'body': 'File transformation completed and saved to destination bucket.'
    }
