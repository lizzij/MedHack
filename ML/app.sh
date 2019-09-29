#!/bin/bash

PATH="/usr/bin/python3:$PATH"
FLASK_ENV=development
FLASK_DEBUG=1
# sudo flask run -h 0.0.0.0 -p 80 --debugger
sudo python3 -m flask run -h 0.0.0.0 -p 80 --debugger