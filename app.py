from flask import Flask, render_template, send_from_directory
app = Flask("app")

@app.route('/')
def hello_world():
  return render_template('index.html')

@app.route('/<region>/<realm>/<name>')
def character_show(region, realm, name): pass

@app.route('/<region>/<realm>/<name>/refresh')
def character_refresh(region, realm, name): pass

@app.route('/error')
def error(): return app.send_static_file('500.html')

@app.route('/missing')
def missing(): return app.send_static_file('404.html')

@app.route('/history/getsha')
def history_getsha(): pass

@app.route('/history/getjson')
def history_getjson(): pass

@app.route('/items-<classtype>')
def items_index(classtype): pass

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0')
