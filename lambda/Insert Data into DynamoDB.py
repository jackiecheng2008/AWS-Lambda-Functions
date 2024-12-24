import boto3
import json
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('YourTableName')

def lambda_handler(event, context):
    item = {
        'id': str(uuid.uuid4()),
        'name': event.get('name', 'Unknown'),
        'age': event.get('age', 0),
    }
    
    table.put_item(Item=item)
    return {
        'statusCode': 200,
        'body': json.dumps(f"Inserted item with ID: {item['id']}")
    }
