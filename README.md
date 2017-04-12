# shadowcraft-ui-react

## Requires

Python3, Pip, MongoDB, Git, Nodejs, NPM, (and virtualenv if you are using it)

## Install on *nix (Bash)

1. `git clone https://github.com/ShadowCraft/shadowcraft-ui-react.git` (clone the repo)
2. `virtualenv --python=python3 venv` (create a virtual environment)
3. `source venv/bin/activate` (use the virtual environment)
4. `pip install -r requirements.txt` (install python dependancies)
5. `npm install` (install javascript dependancies)

## Install on Windows (cmd/powershell)

1. `git clone https://github.com/ShadowCraft/shadowcraft-ui-react.git` (clone the repo)
4. `npm run install:python` (install python dependancies)
5. `npm install` (install javascript dependancies)

Note: Be sure set PATHs for node, python and mongo. You will also need to register for a [blizzard api key](https://dev.battle.net/) and store it in an environment variable called `BLIZZARD_API_KEY`.

## Running

See the scripts section in package.json or `npm run` for a full list of commands

`npm start` - start flask (start serving the website)
`npm run build`- build the javascript manually (webpack)
`npm run watch` - watch and rebuild on changes (webpack)
`npm run mongo` - start mongo

You will usually just want to run the dev script for development
`npm run dev` - start mongo, start webpack, start flask (RUN ALL THE THINGS!)
Note: This command may not work on BASH for Windows.
Note: You may need to `sudo` for mongo on *nix.

Open your browser to `127.0.0.1:5000` to see the site.

## General Project Architecture

Flask serves the pages and communicates with the DB (Mongo). It handles the models and updating of data in the DB and routes requests recieved from the frontend. It also communicates with the shadowcraft engine. Flask is our 'controller' for the most part in MVC speak. The 'view' in flask is very thin, the bulk of the view is contained in react  In deployment, Flask is mounted in a WSGI container provided by Gunicorn. Gunicorn is not needed for development even though it is installed. The flask app is located in `shadowcraft_ui/app.py` Models and templates are located in thier corresponding directories in `shadowcraft_ui`

Character state is fetched from the blizzard apis. And much of this is transformed and cached in mongo. Items are fecthed with a script for deployment and stored in mongo. The mongo db is named `roguesimpython`.

React contains the bulk of the user interface outside of the error pages. It uses Redux to manage the state of the application. The app gets an initial data payload inside of index.html, but after that it fetches data from flask endpoints. The entire app is bundled with webpack into `shadowcraft_ui/static/bundle.js`. We use babel for transpilation. And sass for css generation. The javascript project is fully defined in `package.json` as usual. The react code is in `shadowcraft_ui/js` The entry point is `app.js` It is inserted into the html at `#appjs`. The sass is located in `shadowcraft_ui/css`.

The engine is developed in a separate project named [shadowcraft-engine](https://github.com/ShadowCraft/ShadowCraft-Engine). It houses all of the complex calculations that people care about like dps, tier estimations, stat weights, etc.. It is installed along with the other python dependancies in `requirements.txt`. It is located in `src` To update, simply run the python dependancy installation again and it will fetch the current verison with git.

There are a few other tools, which shouldn't be needed most of the time located in `shadowcraft_ui/external_data` which are used to populate the db. Warning, running these can take some time and aren't needed unless you are specificly working on the db. There are additional tools for deployment and generating talent layouts located in `utils`, which are not usually needed.

## Contributing

You can speak with any of the devs about contributing on [ravenholdt](https://discord.gg/UMRwK8S). Tamen and Aeriwen mostly handle the react UI project. Or tweet Aeriwen at @wavefunctionp. We would be delighted to have you join us on this project.