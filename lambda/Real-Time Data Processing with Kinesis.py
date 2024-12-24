import base64
import json

def lambda_handler(event, context):
    for record in event['Records']:
        payload = base64.b64decode(record['kinesis']['data']).decode('utf-8')
        print("Data from Kinesis:", payload)
    return {
        'statusCode': 200,
        'body': json.dumps('Data processed from Kinesis.')
    }
