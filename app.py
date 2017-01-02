from flask import Flask, render_template, send_from_directory, url_for, redirect
from flask_socketio import SocketIO

app = Flask("app")
app.config['SECRET_KEY'] = 'shhhhhhhh!'
socketio = SocketIO(app)

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route('/<region>/<realm>/<name>')
def character_show(region, realm, name): pass

@app.route('/<region>/<realm>/<name>/refresh')
def character_refresh(region, realm, name): pass

@app.route('/error')
def error(): return render_template('500.html')

@app.route('/missing')
def missing(): return render_template('404.html')

@app.route('/history/getsha')
def history_getsha(): pass

@app.route('/history/getjson')
def history_getjson(): pass

@app.route('/items-<classtype>')
def items_index(classtype): pass

if __name__ == '__main__':
  socketio.run(app, debug=True, host='0.0.0.0')
