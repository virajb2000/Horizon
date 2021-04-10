from flask import Flask, request
import nltk
from nltk.corpus import stopwords

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def get_message():
    if request.method == "GET":
        text = request.get_json()['msg']
        stop_words = set(stopwords.words("english"))
        sentence = "Backgammon is one of the oldest known board games."
        words = nltk.word_tokenize(text)
        without_stop_words = [word for word in words if not word in stop_words]
        return {'response': without_stop_words}