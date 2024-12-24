import boto3

s3 = boto3.client('s3')
source_bucket = 'source-bucket-name'
destination_bucket = 'destination-bucket-name'

def lambda_handler(event, context):
    for record in event['Records']:
        key = record['s3']['object']['key']
        
        response = s3.get_object(Bucket=source_bucket, Key=key)
        content = response['Body'].read().decode('utf-8')
        
        transformed_content = content.upper()
        
        s3.put_object(Bucket=destination_bucket, Key=key, Body=transformed_content)
        
    return {
        'statusCode': 200,
        'body': 'File transformation completed and saved to destination bucket.'
    }
