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

3. Build the docker containers
##### `docker-compose build`
4 Run docker-compose up
##### `docker-compose up -d`

# Author

**Brent Maranzano**

# Additional steps to setup the Image data and UI App

### Steps to populate image data in DB (Only required if you want to populate new images in DB else it will be populated with the default images)
This step will connect to Postgres database, convert and load the image into
numpy array and insert into DB

Navigate to python directory
##### `cd python`
Copy all the images which you want to store in DB and rename them in the below format(starting from 0 to n)
{n}_test.png
Build the docker containers
##### `docker-compose build`
Run docker-compose again
##### `docker-compose up -d`

### Steps to setup UI App (Only required if you make any change in UI and want to deploy latest build)
### Pre-requisite: Node should be installed
Go to ui directory and run following npm commands to create UI App build
##### `cd ui`
##### `npm i`
##### `npm audit fix`
##### `npm run build`
copy all the files from ui/build directory and place inside nginx/html directory
Build and run the app with Compose
##### `docker-compose build`
##### `docker-compose up -d`
Now your UI should be up and running at http://127.0.0.1/

# License

This project is licensed under the MIT License - see the LICENSE file for details
