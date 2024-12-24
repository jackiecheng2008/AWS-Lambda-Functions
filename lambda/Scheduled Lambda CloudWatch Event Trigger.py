import datetime

def lambda_handler(event, context):
    now = datetime.datetime.now()
    print(f"Scheduled Lambda function ran at {now}")
    return {
        'statusCode': 200,
        'body': 'Scheduled Lambda function executed successfully.'
    }
