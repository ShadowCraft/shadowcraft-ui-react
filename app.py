"""This is the module for the main flask app."""
from flask import Flask, render_template, url_for, redirect, json, jsonify, request, abort
from flask_pymongo import PyMongo
from werkzeug.routing import BaseConverter
from bson import json_util

import shadowcraft_ui
from shadowcraft_ui import backend

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
    # TODO: this should probably validate the JSON
    return shadowcraft_ui.get_debug_sha(mongo, request.form['data'])

# Endpoint for requesting item data by slot. Also able to filter by ilvl.


@APP.route('/get_items_by_slot')
def get_items_by_slot():
    # TODO: this should probably take some sort of key to make sure that we're
    # only returning data to our clients and not leaving this open to abuse by
    # other people.
    slot = int(request.args.get('slot'))
    min_ilvl = int(request.args.get('min_ilvl'))
    max_ilvl = int(request.args.get('max_ilvl'))
    return shadowcraft_ui.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

# Endpoint for requesting item data by id and context.


@APP.route('/get_item_by_context')
def get_item_by_context():
    # TODO: this should probably take some sort of key to make sure that we're
    # only returning data to our clients and not leaving this open to abuse by
    # other people.
    item_id = int(request.args.get('id'))
    context = request.args.get('context')
    results = shadowcraft_ui.get_item_by_context(mongo, item_id, context)
    if results == None:
        abort(404)
    else:
        return results

@APP.route('/get_character_data')
def get_character_data():
    region = request.args.get('region')
    realm = request.args.get('realm')
    name = request.args.get('name')

    data = shadowcraft_ui.get_character_data(mongo, region, realm, name)

    return json_util.dumps(data)

# TODO: we probably need other endpoints here for gems, relics, and other
# types of data. Theoretically the event above might be able to handle those
# if we add another argument. Basically I'm trying to get rid of items-rogue.js
# as much as possible. Anything that can be requested on-the-fly via an endpoint
# should be moved to one.

if __name__ == '__main__':
    APP.run(debug=True, host='127.0.0.1', port=5000)
