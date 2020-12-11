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

# Additional steps to setup the Image data and UI App

### Steps to populate image data in DB (Only required if you want to populate new images in DB else it will be populated with the default images)
This step will connect to Postgres database, convert and load the image into
numpy array and insert into DB

1. Navigate to python directory
### `cd python`
2. Copy all the images which you want to store in DB and rename them in the below format(starting from 0 to n)
{n}_test.png
3. Build the docker containers
### `docker-compose build`
4. Run docker-compose again
### `docker-compose up -d`

### Steps to setup UI App (Only required if you make any change in UI and want to deploy latest build)
1. Go to ui directory and create the UI App build
`cd ui`
`npm i`
`npm audit fix`
`npm run build`
2. copy all the files from ui/build directory and place inside nginx/html directory
3. Build and run the app with Compose
`docker-compose build`
`docker-compose up -d`
4. Now your UI should be accessible at http://127.0.0.1/

# License

This project is licensed under the MIT License - see the LICENSE file for details
