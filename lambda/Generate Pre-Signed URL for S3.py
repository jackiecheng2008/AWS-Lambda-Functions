import boto3
import json
import os

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'your-bucket-name'
    object_key = 'path/to/your-object.jpg'
    
    # Generate a pre-signed URL valid for 1 hour (3600 seconds)
    url = s3.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': object_key},
        ExpiresIn=3600
    )
    return {
        'statusCode': 200,
        'body': json.dumps({'url': url})
    }
