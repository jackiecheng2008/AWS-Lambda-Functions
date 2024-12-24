import pymysql
import json
import os

# Database connection details
DB_HOST = os.environ['DB_HOST']
DB_USER = os.environ['DB_USER']
DB_PASSWORD = os.environ['DB_PASSWORD']
DB_NAME = os.environ['DB_NAME']

def lambda_handler(event, context):
    # Connect to the database
    connection = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM employees LIMIT 5")
        result = cursor.fetchall()
    connection.close()
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
