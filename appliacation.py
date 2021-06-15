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
        resp = {"primary": primary_symptoms, "secondary": symptom_relationships}
        return  jsonify(resp)

@app.route("/diagnose", methods=["POST", "GET"])
def diagnose():
    ''' Receives symptoms via xmlhttp request and return json with probable causes and status'''
    if request.method == "POST":
        primary = request.form.get('primary')
        secondary = request.form.get('secondary')
        #print(primary_symptoms[primary])
        #print(f"{secondary}:  {secondary_symptoms[secondary]}")
        diagnosis = diagnostics[(primary,secondary)]
        #print(diagnosis)
        resp = {'status': "Data received successfully", 'HP': diagnosis['HP'], 'LP': diagnosis['LP']}
        return jsonify(resp)


app.run()