#!/bin/sh

cp shcreact.nginx /etc/nginx/sites-available/shcreact.conf
ln -s /etc/nginx/sites-available/shcreact.conf /etc/nginx/sites-enabled/shcreact.conf
cp shcreact.supd /etc/supervisor/conf.d/shcreact.conf
cp shcreact.tmpfiles /etc/tmpfiles.d/shcreact.conf
