import boto3
import json

translate = boto3.client('translate')

def lambda_handler(event, context):
    text = event.get('text', 'Hello, World!')
    target_language = event.get('target_language', 'es')  # Default Spanish

    result = translate.translate_text(
        Text=text,
        SourceLanguageCode="en",
        TargetLanguageCode=target_language
    )
    return {
        'statusCode': 200,
        'body': json.dumps({'translated_text': result['TranslatedText']})
    }
