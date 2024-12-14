#!/bin/bash

cd /home/ec2-user/tetris_clone_deploy

rm -rf /home/ec2-user/tetris_clone/dist
rm -rf /home/ec2-user/tetris_clone/backend-dist

cp -arp dist /home/ec2-user/tetris_clone/
cp -arp backend-dist /home/ec2-user/tetris_clone/

sudo systemctl restart myapp.service

sudo systemctl restart myapp-backend.service