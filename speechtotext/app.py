from flask import Flask, request
import nltk
from nltk.corpus import stopwords
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content Type'
print('entered server')
@app.route('/home', methods=['GET'])
@cross_origin()
def get_message():
    if request.method == "GET":
        return {'tagged':request.get_json()['msg']}