from flask import Flask, request
from flask_cors import CORS, cross_origin
from google.cloud import language_v1
import pprint

pp = pprint.PrettyPrinter(width=41, compact=True)

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content Type'



@app.route('/home', methods=['GET'])
@cross_origin()
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


@app.route('/entity', methods=['GET'])
@cross_origin()
def sample_analyze_entities():
    text_content = request.get_json()['msg']
    client = language_v1.LanguageServiceClient()
    type_ = language_v1.Document.Type.PLAIN_TEXT
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_entities(request = {'document': document, 'encoding_type': encoding_type})

    entity_dict = {}

    for entity in response.entities:

        if str(entity.name) in entity_dict:
            entity_dict[str(entity.name)]['count'] += 1
        else:
            entity_dict[str(entity.name)] = {}
            entity_dict[str(entity.name)]['count'] = 1
            entity_dict[str(entity.name)]['type'] = str(language_v1.Entity.Type(entity.type_).name)
            entity_dict[entity.name]['salience'] = entity.salience

            if 'wikipedia_url' in entity.metadata:
                entity_dict[str(entity.name)]['wikipedia_url'] = entity.metadata['wikipedia_url']

            entity_dict[str(entity.name)]['mention_type'] = language_v1.EntityMention.Type(entity.mentions[0].type_).name
 
    pp.pprint(entity_dict)


    # print(u"Language of the text: {}".format(response.language))
    return {'tagged': 'yo'}