import boto3
import json

rekognition = boto3.client('rekognition')

def lambda_handler(event, context):
    bucket = event['bucket']
    image_key = event['key']
    response = rekognition.detect_text(
        Image={'S3Object': {'Bucket': bucket, 'Name': image_key}}
    )
    detected_texts = [item['DetectedText'] for item in response['TextDetections']]
    return {
        'statusCode': 200,
        'body': json.dumps({'detected_texts': detected_texts})
    }
