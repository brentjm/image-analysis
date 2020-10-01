# Docker containers to work on image analysis
Builds Docker containers (NginX, PostgreSQL, Flask) to provide
a web interface to enable image analysis.

## Overview
This repository will start an NginX web server to serve a HTML user interface
to view and manipulae images. The NginX service provides a reverse proxy
to a Flask application that can provide image calculations. NginX also reverse
proxies a PostgreSQL database, which the images are stored.

## Getting started
1. clone this repository
2. run pre-setup.sh (configures the files prior to running docker-compose)
`./pre-setup.sh`
2. run docker-compose
`$docker-compose up -d`
3. run post-setup.sh (configures running containers)
`$./post-setup.sh`
4. create a web app and place in nginx/html/index.html (See nginx/Dockerfile)

# Author

**Brent Maranzano**

# License

This project is licensed under the MIT License - see the LICENSE file for details
