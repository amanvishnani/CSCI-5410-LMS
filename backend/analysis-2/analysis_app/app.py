import json
import xmltodict
import requests
import boto3

session = boto3.Session()
s3 = session.client('s3')
hack = {
    'comprehend':  None
}
analysisResultBucket = "analysis-result"

bucket_url = "https://storage.googleapis.com/chatmessages"

def file_ingester(event, context):
    resp = requests.get(bucket_url)
    jsonObj = xmltodict.parse(resp.text)
    filesList = jsonObj["ListBucketResult"]["Contents"]

    for ele in filesList:
        file_name = ele['Key']
        print(ele)
        txt = (requests.get(bucket_url+"/"+file_name)).text
        print(file_name)
        upload_file(s3, file_name, txt)

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "OK",
        }),
    }

def upload_file(s3, file_name, body):
    bucket_name = 'upload-analysis-2'
    try:
        print("[Start] Upload file into Bucket")
        s3.put_object(Bucket=bucket_name, Key=file_name, Body=body)
        print("[Complete] Upload file into Bucket")
    except Exception as e:
        print("[FAILED] Upload file into Bucket", e)



def get_bucket_data(fileName, bucketName, client):
    response = client.get_object(
        Bucket=bucketName,
        Key=fileName
    )
    body = response['Body'].read().decode('utf-8')
    bodyJson = json.loads(body) 
    return bodyJson

def checkFileExists(id, analysisResultBucket, s3):
    try:
        s3.head_object(Bucket=analysisResultBucket,Key=id+".json")
        return True
    except:
        return False

def get_sentiment_details(message, provider):
    if provider['comprehend'] is None:
        provider['comprehend'] = boto3.client('comprehend')
    comprehend = provider['comprehend']
    dominantLangCode = comprehend.detect_dominant_language(Text=message)['Languages'][0]['LanguageCode']
    if dominantLangCode not in ['ar', 'hi', 'ko', 'zh-TW', 'ja', 'zh', 'de', 'pt', 'en', 'it', 'fr', 'es']:
        dominantLangCode = 'en'
    response = comprehend.detect_sentiment(Text=message, LanguageCode=dominantLangCode)
    Sentiment = str(response['Sentiment'])
    SentimentInitCap = Sentiment[0] + Sentiment.lower()[1:]
    Score = str(response['SentimentScore'][SentimentInitCap])
    return {
        'sentiment': Sentiment,
        'score': Score,
        'text': message
    }

def saveSentimentDetails(id, SentimentDetails, s3):
    s3.put_object(Bucket=analysisResultBucket, Key=id+".json", Body=json.dumps(SentimentDetails))

def sentimentAnalysis(event, context):
    s3_record = event['Records'][0]['s3']
    bucketName = s3_record['bucket']['name']
    fileName = s3_record['object']['key']
    bodyJson = get_bucket_data(fileName, bucketName, s3) 
    for ele in bodyJson:
        message = ele['message']
        text = message['text']
        id = message['id']
        fileExist = checkFileExists(id, analysisResultBucket, s3)
        if(fileExist):
            return
        else:
            SentimentDetails = get_sentiment_details(text, hack)
            saveSentimentDetails(id, SentimentDetails, s3)



# checkFileExists(1, analysisResultBucket, s3)
# file_ingester(None, None)

# event = {
#     'Records': [
#         {
#             's3': {
#                 'object': {
#                     'key': "1/260720201848.json"
#                 },
#                 'bucket': {
#                     'name': "upload-analysis-2"
#                 }
#             }
#         }
#     ]
# }
# sentimentAnalysis(event, None)