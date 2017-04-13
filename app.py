"""This is the module for the main flask app."""
from flask import Flask, render_template, url_for, redirect, json, jsonify, request
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


@APP.route('/')
def main():
    return render_template('index.html')

# Main route for the application. Loads a character.


@APP.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>')
def character_show(region, realm, name):
    data = shadowcraft_ui.get_character_data(mongo, region, realm, name)
    character_json = json.dumps(data, indent=4, default=json_util.default)
    return render_template('index.html', character_json=character_json)

# Refreshes a character from the armory and redirects to the main route.
# TODO: Flask adds a "redirecting" page before redirecting. Is there a way
# to keep it from doing that?


@APP.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/refresh')
def character_refresh(region, realm, name):
    shadowcraft_ui.refresh_character(mongo, region, realm, name)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# Requests a character page based on a saved sha value.


@APP.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/#!/<sha>')
def character_sha(region, realm, name, sha):
    shadowcraft_ui.get_character_data(mongo, region, realm, name, sha=sha)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# TODO: are these really necessary? Can't we just return 400/500 errors when
# necessary and configure flask to handle them as such?


@APP.route('/error')
def error():
    return render_template('500.html')


@APP.route('/missing')
def missing():
    return render_template('404.html')


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
    slot = request.form['slot']
    min_ilvl = request.form['min_ilvl']
    max_ilvl = request.form['max_ilvl']
    return shadowcraft_ui.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

# TODO: we probably need other endpoints here for gems, relics, and other
# types of data. Theoretically the event above might be able to handle those
# if we add another argument. Basically I'm trying to get rid of items-rogue.js
# as much as possible. Anything that can be requested on-the-fly via an endpoint
# should be moved to one.

if __name__ == '__main__':
    APP.run(debug=True, host='127.0.0.1', port=5000)
