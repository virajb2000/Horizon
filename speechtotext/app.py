from flask import Flask, request
import nltk
from nltk.corpus import stopwords
import spacy

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def get_message():
    if request.method == "GET":
        text = request.get_json()['msg']
        nlp = spacy.load('en')
        doc = nlp(text)

        stopwords = set(stopwords.words("english"))
        words = nltk.word_tokenize(text)
        without_stopwords = [word for word in words if not word in stopwords]
        tagged = nltk.pos_tag(without_stopwords)
        sub_toks = [tok for tok in doc if (tok.dep_ == "nsubj") ]

        return {'tagged': tagged, 'subjects': sub_toks}