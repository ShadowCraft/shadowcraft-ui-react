# shadowcraft-ui-react

## Requires

python3 and node and mongodb

## Install

1. Clone this repo
2. `virtualenv --python=python3 venv`
3. `source venv/bin/activate`
4. `npm run install-python` 
5. `npm install`

Note: Be sure to have set PATHs for node, python and mongo

## Running

See scripts in package.json for a full list of commands

npm start - start flask
npm run build - run webpack and build the javascript manually
npm run watch - run webpack  in watch mode, automaticly rebuilding after each change

You will usually just want to run the dev script for development
npm run dev - start mongo, start webpack, start flask

Connect to the server now running on port 5000.
