const AWS = require('aws-sdk');
const sharp = require('sharp');

exports.handler = async (event) => {
  const s3 = new AWS.S3();

  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    try {
      const params = { Bucket: bucket, Key: key };
      const image = await s3.getObject(params).promise();

      const resizedImage = await sharp(image.Body)
        .resize(200, 200)
        .toBuffer();

      const uploadParams = { 
        Bucket: 'processed-images-bucket', 
        Key: key, 
        Body: resizedImage 
      };
      await s3.putObject(uploadParams).promise();

      console.log(`Successfully processed ${key}`);
    } catch (error) {
      console.error(`Error processing ${key}:`, error);
    }
  }
};