import os

from flask import Flask, render_template, jsonify, request

from knowledgebase import *
from rules import *

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


app.run()