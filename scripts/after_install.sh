#!/bin/bash

cd /home/ec2-user/Chess_deploy

rm -rf /home/ec2-user/Chess/builds

cp -arp builds /home/ec2-user/Chess/

sudo systemctl restart chess-ui.service

sudo systemctl restart chess-api.service