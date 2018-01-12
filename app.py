"""This is the module for the main flask app."""
import os
from flask import Flask, render_template, url_for, redirect, json, jsonify, request, abort
from flask_pymongo import PyMongo
from werkzeug.routing import BaseConverter
from bson import json_util

import shadowcraft_ui
from shadowcraft_ui import backend

os.environ['PYTHONIOENCODING'] = 'utf-8'

APP = Flask('shadowcraft_ui')
APP.config['SECRET_KEY'] = 'shhhhhhhh!'
APP.config['MONGO_DBNAME'] = 'roguesim_python'

# Have to do this so that the request object sent to the /engine endpoint doesn't
# overrun the limit
APP.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024

mongo = PyMongo(APP)


class RegexConverter(BaseConverter):

    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]
APP.url_map.converters['regex'] = RegexConverter

# Main route for the application. This will call into react and let Router handle
# the actual render of either the front page or a character page depending on the
# path.

@APP.route('/', defaults={'path': ''})
@APP.route('/<path:path>')
def main(path):
    return render_template('index.html')


# Engine endpoints. /engine is a call to get DPS data. /settings gives back the
# default settings configuration.

@APP.route('/engine', methods=['POST'])
def engine():
    output = backend.get_engine_output(mongo.db, request.get_json())
    return jsonify(output)

@APP.route('/settings')
def settings():
    settings_data = backend.get_settings()
    return jsonify(settings_data)


# Endpoint for requesting a new debug SHA based on from character data.

@APP.route('/get_sha', methods=['POST'])
def get_sha():
    return jsonify(shadowcraft_ui.get_debug_sha(mongo, request.get_json()))


@APP.route('/get_character_data')
def get_character_data():
    region = request.args.get('region')
    realm = request.args.get('realm')
    name = request.args.get('name')
    sha = request.args.get('sha')
    data = shadowcraft_ui.get_character_data(mongo, region, realm, name, sha)

    return json_util.dumps(data)


if __name__ == '__main__':
    APP.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
