import os

from flask import Flask, render_template, jsonify, request

from knowledgebase import *
from rules import *

app = Flask(__name__)

@app.route("/")
def index():
    ''' Renders index page '''
    return render_template("index.html")

@app.route("/symptoms", methods=["POST", "GET"])
def symptoms():
    '''Function to fetch symptoms and return as json'''
    if request.method == "GET":
        resp = {"primary": primary_symptoms, "secondary": secondary_symptoms}
        return  jsonify(resp)


app.run()