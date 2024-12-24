import boto3
import json
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('YourTableName')

def lambda_handler(event, context):
    enriched_data = {
        'id': str(uuid.uuid4()),
        'data': event.get('data', {}),
        'timestamp': int(context.timestamp)
    }
    table.put_item(Item=enriched_data)
    return {
        'statusCode': 200,
        'body': json.dumps(f"Data inserted with ID: {enriched_data['id']}")
    }
