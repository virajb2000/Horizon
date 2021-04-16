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
        "type": "service_account",
        "project_id": "horizon-310904",
        "private_key_id": "25b784727a7df2563c0c61e805924ebd57105958",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCa55F9KjRNS57F\nRAFCAkNSubjMopxZkXlVBN0lVKXK3V7ybf9A29qve3JJcdshrI5FGEutN3POtLW7\nN88IhmQUqxdidOyKb7vyt1LMegbncIJXpYGIpN3qOio+hsuYN8u2ghmjFPATBECn\ng8CrU9xjixwixZ6i2yM1f6v6E2h8gxmkDoks6kToUvZY8pV2ptsvXIPAJbW8HcW7\n8XAsv2H1Ju5w1rBJuEOdkypth1c0mNQl4NRovRsMUPJ0SUMYCuiBKOb53B4bUf9m\n0EWgaZQYWjpUcPMWlNuTIL+03CQw7ne/seJkrnMzq4Zv91ydeqmG+Cep+uLODi8Q\nptrKjaJNAgMBAAECggEAH/6a6AOO1HU9SKjUaq4deil2kDu49+4KZcNQqvx6FvXU\nvdV23o5ac5rXfvB3jpO9ues7/D3DG2trSs1K44uggb1Z4eHdFnXgF9CCF05P/T8Z\niOFcKR1GYbHcVlhQlnLVzm8+PNcfBAqBkSfvJGP4lg3eRJdVPfVtpwfk/UzDbM3z\n+rQfXdb/CGWUKcKX0PDH/cLWNuUI0+boJz6+CcvBqn/EnJ+M4WVHItOebT3Jl0DZ\nmEmgD8qLT+tJd8zVGwqgtMBKOQ9WzViTMlzlKYjsHkH2IcChHoifuBu3WZrYIoHk\nyco0RaaheYw+4MikbUsjJTEsFFHb4meI+y1ZF6N9IQKBgQDI0cUI8sFn/8UcVQcx\nVHCX11HvIwGjTLkUEN8RP2RFpb479pQgnL3KjCMj2AO57bh4Uh+4ZHqBp+fvtMpk\ndMzdmyJckf6J4mYoEKwsdlkGIAtg7bv3dNkeko5KYyN949voF8ZmY8eBZt7KbFvi\nwrDHH08VGGO8O2tzJz9/gy8ZYQKBgQDFeAM7OhAb+lMgz7ZZugEGzO00pPJp89N/\n2vzcv8p3WnNAt9guHkTSIg+yS4tmX8Bztez4Ohd3z0Mbrp2SFpj2gj611yOPt75y\nRpRLWV8z5H75LdexpiKiem3iBmxqMQZzpyncPas2d3zKELaMrZ7RWqXICmqyzm2V\nYP5QLqxUbQKBgQCQVjVIOTLJjQwfUP3adtZ2TEyXlJGYzYw43+d0fhuT84zHjHLq\n/b1r101qddg3yqTL1jr2TUG/7u7FWywdB9Y3cUlBP62zbQX/xfv5+RYDUQTcpgJz\n2Yg0cSHUVW0tDpkAOBZhgVXjrAx1cWyZj1V/yQEOKHmG0S5plcwN2jwAAQKBgQDC\nHX/PsPw1BJbDImz3N0nbDYgAwEUssmuuu+7mcgLt4RR7Aj6Y11h/2MvlUS3vrSDa\nnnQcb76yICSwCa8L9PrZGJ/c0Wg71zx3ybnteCWGNZA8Ezx9fft+DSwHjJj2qsrU\n1fbochbkrAEYAeXx1JrS4nElfFf2/cXrmjVlTPxK4QKBgQCYTlDxETV/u4wZiwMH\nIPTQw+20Y/Ye7zV52uZ0+my2HsYPfu97qWIqWajQHs+qqwxY/uAsIKpONOGJtAf7\nkJIiJDiYLJSPs7Zjdo0edrmUWv6qys6LhRl0rcKNCoAPmtxIrreZdNMxM2amZu4V\nP3YJW1veK9wg4oI4wiCdyTRSLw==\n-----END PRIVATE KEY-----\n",
        "client_email": "aws-lambda@horizon-310904.iam.gserviceaccount.com",
        "client_id": "113829119946685113211",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/aws-lambda%40horizon-310904.iam.gserviceaccount.com"
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
