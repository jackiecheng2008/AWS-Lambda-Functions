import json

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        print(f"File uploaded: {key} in bucket: {bucket}")
    return {
        'statusCode': 200,
        'body': json.dumps('File upload processed successfully.')
    }
