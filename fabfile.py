###############
### imports ###
###############

from fabric.api import cd, env, sudo, run
from fabric.contrib.files import exists


##############
### config ###
##############

env.hosts = ['beta.shadowcraft.mmo-mumble.com']
env.user = 'web'


#############
### tasks ###
#############

def deploy():
    with cd('/home/web/shadowcraft-ui-react'):
        run('git pull')
        run('source venv/bin/activate')
        run('npm install')
        run('venv/bin/pip install -r requirements.txt')
        run('npm run build-prod')
        run('sudo /usr/bin/supervisorctl restart shcreact', shell=False)

def status():
    """ Is our app live? """
    run('sudo supervisorctl status shcreact')
