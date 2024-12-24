import json

def lambda_handler(event, context):
    for record in event['Records']:
        sns_message = record['Sns']['Message']
        print(f"Received SNS message: {sns_message}")
        
        # Custom logic for the SNS message can go here
    return {
        'statusCode': 200,
        'body': json.dumps('SNS message processed successfully.')
    }
