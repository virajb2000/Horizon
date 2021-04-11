from flask import Flask, request
from flask_cors import CORS, cross_origin
from google.cloud import language_v1
import pprint
import requests
import uuid

pp = pprint.PrettyPrinter(width=41, compact=True)

app = Flask(__name__)
app.debug = True
cors = CORS(app)
# cors =CORS(app, resources=r'/*', headers='Content-Type')
# app.config['CORS_HEADERS'] = 'Content-Type: application/json; charset=utf-8'


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


@app.route('/home', methods=['GET'])
# @cross_origin()
def get_message():
    if request.method == "GET":
        # # Instantiates a client
        # client = language_v1.LanguageServiceClient()

        # # The text to analyze
        # text = u"Hello, world!"
        # document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)

        # # Detects the sentiment of the text
        # sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment

        # return {'tagged': text}
        return {'tagged': 'hey'}


@app.route('/entity', methods=['GET', 'POST'])
@cross_origin()
def sample_analyze_entities():
    print('here')
    # print(request)
    # print(request.get_data())
    text_content = request.args['msg']
    client = language_v1.LanguageServiceClient()
    type_ = language_v1.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
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


    # print(u"Language of the text: {}".format(response.language))
    # print(imgLinkToSend)
    # print(list(entity_dict.keys()))
    return {
        'id': str(uuid.uuid1()),
        'search_term': max_salience_key,
        'image_url': imgLinkToSend,
        'word_list': list(entity_dict.keys())
    }