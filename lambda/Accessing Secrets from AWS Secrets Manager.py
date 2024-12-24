import boto3
import json
import os

secrets_client = boto3.client('secretsmanager')
secret_name = os.environ['SECRET_NAME']

def lambda_handler(event, context):
    # Retrieve the secret
    response = secrets_client.get_secret_value(SecretId=secret_name)
    secret_data = json.loads(response['SecretString'])
    
    # Use the secret data here...
    print("Secret data retrieved:", secret_data)
    return {
        'statusCode': 200,
        'body': 'Secret retrieved successfully.'
    }
