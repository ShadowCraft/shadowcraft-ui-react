# shadowcraft-ui-react

## Requires

Python3, Pip, Nodejs, NPM, MongoDB, Git

*Be sure set PATHs for node, python and mongo. Command not found is usually a missing/incorrect PATH or dependency.*

`pip install virtualenv` if you don't have it already.

## Install on **nix* (bash)

1. `git clone https://github.com/ShadowCraft/shadowcraft-ui-react.git` (clone this repo)
2. `virtualenv --python=python3 venv` (create a virtual environment using python 3)
3. `source venv/bin/activate` (swap to the virtual environment, you should see (venv) at the start of your command prompt)
4. `pip install -r requirements.txt` (install python dependencies)
5. `npm install` (install javascript dependencies)

*These commands may not work on BASH for Windows.*

## Install on Windows (cmd/powershell)

1. `git clone https://github.com/ShadowCraft/shadowcraft-ui-react.git` (clone this repo)
2. `py -3 -m virtualenv venv` (create a virtual environment using python 3)
3. `./venv/scripts/activate` (swap to the virtual environment, you should see (venv) at the start of your command prompt)
4. `npm run install:python` (install python dependencies)
5. `npm install` (install javascript dependencies)

You will also need to register for a [blizzard api key](https://dev.battle.net/).

Store the key in an environment variable named `BLIZZARD_API_KEY`.

## Deploying in a hosted environment

Requires nginx and supervisord, plus the above requirements.

1. `git clone https://github.com/ShadowCraft/shadowcraft-ui-react.git` (clone this repo)
2. As root, run `shadowcraft-ui-react/utils/deploy/deploy.sh`. This creates all of the necessary configuration files and virtualenv.
3. Run steps 3-5 in the *nix section above.

Alternatively for step 3, if you have the repo cloned on another machine with the fabric python module installed, you can modify the `fabfile.py` file to point to your host and directory and run `fab deploy`.

## Running

Always swap to the virtual environment with `source venv/bin/activate` or `./venv/scripts/activate` when you want to develop.
When you wish to do so, you can leave this environment with `deactivate`.

You will usually just want to run this dev script for development. Be sure to swap to the venv each time before you start.

`npm run dev` - **RUN ALL THE THINGS!**

This will start up flask, mongo, and build the javascript and css.

_You may need to prefix with `sudo` on *nix to run mongod._

**Navigate your browser to `127.0.0.1:5000` to see the site.**

*See the scripts section in package.json or `npm run` for a full list of commands.*

When you need to do so, you can stop the running processes with `ctrl + c` (and possibly y to confirm).

## General Project Architecture

Flask serves the pages and communicates with the DB (Mongo). It handles the models and updating of data in the DB and routes requests received from the frontend. It also communicates with the shadowcraft engine. Flask is our 'controller' for the most part in MVC speak. The 'view' in flask is very thin, the bulk of the view is contained in react  In deployment, Flask is mounted in a WSGI container provided by Gunicorn. Gunicorn is not needed for development even though it is installed. The flask app is located in `shadowcraft_ui/app.py` Models and templates are located in their corresponding directories in `shadowcraft_ui`

Character state is fetched from the blizzard apis. And much of this is transformed and cached in mongo. Items are fetched with a script for deployment and stored in mongo. The mongo db is named `roguesimpython`.

React contains the bulk of the user interface outside of the error pages. It uses Redux to manage the state of the application. The app gets an initial data payload inside of index.html, but after that it fetches data from flask endpoints. The entire app is bundled with webpack into `shadowcraft_ui/static/bundle.js`. We use babel for transpilation. And sass for css generation. The javascript project is fully defined in `package.json` as usual. The react code is in `shadowcraft_ui/js` The entry point is `app.js` It is inserted into the html at `#appjs`. The sass is located in `shadowcraft_ui/css`.

The engine is developed in a separate project named [shadowcraft-engine](https://github.com/ShadowCraft/ShadowCraft-Engine). It houses all of the complex calculations that people care about like dps, tier estimations, stat weights, etc.. It is installed along with the other python dependencies in `requirements.txt`. It is located in `src` To update, simply run the python dependency installation again and it will fetch the current version with git.

There are a few other tools, which shouldn't be needed most of the time located in `shadowcraft_ui/external_data` which are used to populate the db. Warning: Running these can take some time. They aren't usually needed unless you are specifically working on the db. There are additional tools for deployment and generating talent layouts located in `utils`, which are not usually needed.

## Contributing

You can speak with any of the devs about contributing on [ravenholdt](https://discord.gg/UMRwK8S). Tamen and Aeriwen mostly handle the react UI project. Or tweet Aeriwen at @wavefunctionp. We would be delighted to have you join us on this project.
