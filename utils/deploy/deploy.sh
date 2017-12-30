#!/bin/bash

SCRIPT_DIR=$(cd `dirname $0` && pwd)

cp ${SCRIPT_DIR}/shcreact.nginx /etc/nginx/sites-available/shcreact.conf
ln -sf /etc/nginx/sites-available/shcreact.conf /etc/nginx/sites-enabled/shcreact.conf
cp ${SCRIPT_DIR}/shcreact.supd /etc/supervisor/conf.d/shcreact.conf
cp ${SCRIPT_DIR}/shcreact.sudoers /etc/sudoers.d/shcreact.conf

mkdir /run/shcreact
chown web /run/shcreact

pushd ${SCRIPT_DIR}/../.. > /dev/null
if [ ! -d venv ]; then
    virtualenv -p python3 venv
    source venv/bin/activate
    pip install --upgrade setuptools
    chown -R web:web venv
    deactivate
fi
popd > /dev/null
