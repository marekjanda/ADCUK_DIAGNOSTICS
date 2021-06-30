import os

from flask import Flask, render_template, jsonify, request, redirect, url_for
from flask_session import Session
from user_agents import parse

from knowledgebase import *
from rules import *

app = Flask(__name__)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/", methods=["POST", "GET"])
def index():
    ''' Renders index page '''
    user_agent = parse(request.headers.get('User-Agent'))
    #mobile = True
    mobile = user_agent.is_mobile
    print(f"Mobile: {mobile}")
    main_labels = f"{primary_symptoms['0']},{primary_symptoms['1']},{primary_symptoms['2']},{primary_symptoms['3']},{primary_symptoms['4']},{primary_symptoms['5']},{primary_symptoms['6']}"
    if mobile:
        return render_template("index.html", mobile=mobile, main_labels=primary_symptoms)
    return render_template("index.html", mobile=mobile, main_labels=main_labels)

@app.route("/secondarysymptoms/<p>", methods=["POST", "GET"])
def secondarysymptoms(p):
    return render_template("secondary.html", primary=primary_symptoms[p])

@app.route("/symptoms", methods=["POST", "GET"])
def symptoms():
    '''Function to fetch symptoms and return them in json'''
    if request.method == "GET":
        resp = {"primary": primary_symptoms, "secondary": symptom_relationships}
        return  jsonify(resp)

@app.route("/diagnose", methods=["POST", "GET"])
def diagnose():
    ''' Receives symptoms via xmlhttp request and return json with probable causes and status'''
    if request.method == "POST":
        primary = request.form.get('primary')
        secondary = request.form.get('secondary')
        if secondary == 'Select Second Symptom':
            resp = {'status': "ERROR"}
        else:
            #print(primary_symptoms[primary])
            #print(f"{secondary}:  {secondary_symptoms[secondary]}")
            diagnosis = diagnostics[(primary,secondary)]
            #print(diagnosis)
            resp = {'status': "Data received successfully", 'HP': diagnosis['HP'], 'LP': diagnosis['LP']}
        return jsonify(resp)

