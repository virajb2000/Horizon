import json
from google.cloud import language_v1
import pprint
import requests
import uuid
import requests

def searchBing(search_term):
    subscription_key = "9b6f4a0de7b8412797a9e9b8a4176c1a"
    search_url = "https://api.bing.microsoft.com/v7.0/images/search"

    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}

    params  = {"q": search_term, "license": "public", "imageType": "photo"}

    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    search_results = response.json()
    thumbnail_urls = [img["thumbnailUrl"] for img in search_results["value"][:16]]
    return thumbnail_urls[0]

def sample_analyze_entities(text_content):
    client = language_v1.LanguageServiceClient()
    type_ = language_v1.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_entities(request = {'document': document, 'encoding_type': encoding_type})

    entity_dict = {}
    max_salience_key = None
    max_salience = -1

    for entity in response.entities:

        if str(entity.name) in entity_dict:
            entity_dict[str(entity.name)]['count'] += 1
        elif str(language_v1.Entity.Type(entity.type_).name) != 'NUMBER':
            entity_dict[str(entity.name)] = {}
            entity_dict[str(entity.name)]['count'] = 1
            entity_dict[str(entity.name)]['type'] = str(language_v1.Entity.Type(entity.type_).name)
            entity_dict[entity.name]['salience'] = entity.salience
            if entity.salience > max_salience:
                max_salience_key = entity.name
                max_salience = entity.salience


            if 'wikipedia_url' in entity.metadata:
                entity_dict[str(entity.name)]['wikipedia_url'] = entity.metadata['wikipedia_url']

            entity_dict[str(entity.name)]['mention_type'] = language_v1.EntityMention.Type(entity.mentions[0].type_).name
 
    imgLinkToSend = searchBing(max_salience_key)

    return {
        'id': str(uuid.uuid1()),
        'search_term': max_salience_key,
        'image_url': imgLinkToSend,
        'word_list': list(entity_dict.keys())
    }

def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e
    # with open("horizon-310904-25b784727a7d.json", "w") as file1:
    credentials = {
    }
        # file.write(json.dump(credentials))

    text_content = event["queryStringParameters"]["msg"] if 'msg' in event["queryStringParameters"] else None
    return {
        "statusCode": 200,
        'headers': {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        "body": json.dumps({
            "message": sample_analyze_entities(text_content) if text_content is not None else 'pass through',
            # "location": ip.text.replace("\n", "")
        }),
    }
