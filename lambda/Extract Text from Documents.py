import boto3
import json

textract = boto3.client('textract')

def lambda_handler(event, context):
    bucket = event['bucket']
    document_key = event['document_key']

    response = textract.analyze_document(
        Document={'S3Object': {'Bucket': bucket, 'Name': document_key}},
        FeatureTypes=['TABLES', 'FORMS']
    )
    extracted_text = []
    for item in response['Blocks']:
        if item['BlockType'] == 'LINE':
            extracted_text.append(item['Text'])

    return {
        'statusCode': 200,
        'body': json.dumps({'extracted_text': ' '.join(extracted_text)})
    }
