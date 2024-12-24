import json

def lambda_handler(event, context):
    device_id = event['device_id']
    temperature = event['temperature']
    humidity = event['humidity']
    print(f"Received data from device {device_id}:")
    print(f"Temperature: {temperature}°C")
    print(f"Humidity: {humidity}%")

    # Example: trigger an alert if temperature is too high
    if temperature > 30:
        print(f"Alert! High temperature detected: {temperature}°C")

    return {
        'statusCode': 200,
        'body': json.dumps('IoT data processed successfully.')
    }
