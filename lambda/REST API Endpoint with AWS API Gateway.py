import json

def lambda_handler(event, context):
    # Extract query parameters from the event
    name = event['queryStringParameters'].get('name', 'Guest')
    return {
        'statusCode': 200,
        'body': json.dumps({'message': f'Hello, {name}! Welcome to the API.'})
    }
