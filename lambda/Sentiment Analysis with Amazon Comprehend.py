import boto3
import json

comprehend = boto3.client('comprehend')

def lambda_handler(event, context):
    text = event.get('text', 'I am very happy with this service!')
    response = comprehend.detect_sentiment(Text=text, LanguageCode='en')
    sentiment = response['Sentiment']
    sentiment_score = response['SentimentScore']
    return {
        'statusCode': 200,
        'body': json.dumps({
            'sentiment': sentiment,
            'sentiment_score': sentiment_score
        })
    }
