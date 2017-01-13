from flask import Flask, render_template, url_for, redirect, request
from flask_socketio import SocketIO
from flask_pymongo import PyMongo
from werkzeug.routing import BaseConverter
import shadowcraft_ui
import os

app = Flask('shadowcraft_ui')
app.config['SECRET_KEY'] = 'shhhhhhhh!'
app.config['MONGO_DBNAME'] = 'roguesim_development'
socketio = SocketIO(app)
mongo = PyMongo(app)

class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]
app.url_map.converters['regex'] = RegexConverter
        
@app.route('/')
def main():
  return render_template('index.html')

# Main route for the application. Loads a character.
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>')
def character_show(region, realm, name):
    data = shadowcraft_ui.get_character_data(mongo, region, realm, name)
    return "data"

# Refreshes a character from the armory and redirects to the main route.
# TODO: Flask adds a "redirecting" page before redirecting. Is there a way
# to keep it from doing that?
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/refresh')
def character_refresh(region, realm, name):
    shadowcraft_ui.refresh_character(mongo, region, realm, name)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# Requests a character page based on a saved sha value.
@app.route('/<regex("(us|eu|kr|tw|cn|sea)"):region>/<realm>/<name>/#!/<sha>')
def character_sha(region, realm, name, sha):
    shadowcraft_ui.refresh_character(mongo, region, realm, name)
    url = url_for('character_show', region=region, realm=realm, name=name)
    return redirect(url)

# TODO: are these really necessary? Can't we just return 400/500 errors when
# necessary and configure flask to handle them as such?
@app.route('/error')
def error(): return render_template('500.html')

@app.route('/missing')
def missing(): return render_template('404.html')

# Websocket event for requesting a new debug SHA based on from character data.
@socketio.on('get_sha')
def history_getsha(character_data):
    return shadowcraft_ui.get_debug_sha(mongo, character_data)

# Websocket event for requesting item data by slot. Also able to filter by ilvl.
@socketio.on('get_items_by_slot')
def get_items_by_slot(slot, min_ilvl=-1, max_ilvl=-1):
    return shadowcraft_ui.get_items_by_slot(mongo, slot, min_ilvl, max_ilvl)

# TODO: we probably need other endpoints here for gems, relics, and other
# types of data. Theoretically the event above might be able to handle those
# if we add another argument. Basically I'm trying to get rid of items-rogue.js
# as much as possible. Anything that can be requested on-the-fly via a
# websocket event should be moved to one.

if __name__ == '__main__':
  socketio.run(app, debug=True, host='0.0.0.0')
