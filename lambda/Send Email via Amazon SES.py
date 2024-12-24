import boto3
import json

ses = boto3.client('ses')

def lambda_handler(event, context):
    response = ses.send_email(
        Source='sender@example.com',
        Destination={
            'ToAddresses': ['recipient@example.com'],
        },
        Message={
            'Subject': {'Data': 'Lambda Notification'},
            'Body': {'Text': {'Data': 'This is a test email from AWS Lambda'}}
        }
    )
    return {
        'statusCode': 200,
        'body': json.dumps(f"Email sent successfully with MessageId: {response['MessageId']}")
    }
