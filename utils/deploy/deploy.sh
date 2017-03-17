#!/bin/sh

cp shcreact.service /etc/systemd/system/shcreact.service
cp shcreact.nginx /etc/nginx/sites-enabled/shcreact
cp shcreact.tmpfiles /etc/tmpfiles.d/shcreact.conf
