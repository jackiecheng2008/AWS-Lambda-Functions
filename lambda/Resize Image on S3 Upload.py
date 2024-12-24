import boto3
from PIL import Image
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        
        # Download the image
        response = s3.get_object(Bucket=bucket, Key=key)
        image = Image.open(response['Body'])
        
        # Resize the image
        image = image.resize((100, 100))
        
        # Save the resized image to S3
        buffer = io.BytesIO()
        image.save(buffer, 'JPEG')
        buffer.seek(0)
        
        s3.put_object(
            Bucket=bucket,
            Key=f"resized/{key}",
            Body=buffer,
            ContentType='image/jpeg'
        )
    return {
        'statusCode': 200,
        'body': 'Image resized and saved to S3.'
    }
