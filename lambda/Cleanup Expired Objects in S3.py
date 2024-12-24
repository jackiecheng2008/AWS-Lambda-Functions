import boto3
from datetime import datetime, timedelta

s3 = boto3.client('s3')
bucket_name = 'your-bucket-name'
expiration_days = 7

def lambda_handler(event, context):
    expiration_date = datetime.now() - timedelta(days=expiration_days)
    
    objects = s3.list_objects_v2(Bucket=bucket_name).get('Contents', [])
    
    for obj in objects:
        if obj['LastModified'] < expiration_date:
            print(f"Deleting {obj['Key']} (last modified: {obj['LastModified']})")
            s3.delete_object(Bucket=bucket_name, Key=obj['Key'])
    return {
        'statusCode': 200,
        'body': 'Expired objects cleaned up.'
    }
