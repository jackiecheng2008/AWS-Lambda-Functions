'use strict';
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  const translate = new AWS.Translate();
  const text = event.text || 'Hello, World!';
  const targetLanguage = event.target_language || 'es';

  const params = {
    Text: text,
    SourceLanguageCode: 'en',
    TargetLanguageCode: targetLanguage
  };

  const result = await translate.translateText(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ translated_text: result.TranslatedText })
  };
};
