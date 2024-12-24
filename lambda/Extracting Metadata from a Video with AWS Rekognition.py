import boto3
import json

rekognition = boto3.client('rekognition')

def lambda_handler(event, context):
    bucket = event['bucket']
    video_key = event['video_key']
    
    response = rekognition.start_label_detection(
        Video={'S3Object': {'Bucket': bucket, 'Name': video_key}},
        NotificationChannel={
            'SNSTopicArn': 'arn:aws:sns:region:account-id:YourSNSTopic',
            'RoleArn': 'arn:aws:iam::account-id:role/RekognitionRole'
        }
    )
    
    job_id = response['JobId']
    print(f"Video analysis started with Job ID: {job_id}")
    return {
        'statusCode': 200,
        'body': json.dumps(f"Video analysis started with Job ID: {job_id}")
    }
