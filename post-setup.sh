#!/bin/bash

################################################################################
# Script name: post-setup.sh
# Description: Post container creation configuration (things that are not easy
#   to configure in Dockerfile).
# Args: None
# Author: Brent Maranzno
# email: brent_maranzano@gmail.com

# Usage:
# ./post-setup.sh
################################################################################

echo "Copy postgres configuration file."
docker cp ./postgres/pg_hba.conf postgres:/var/lib/postgresql/data/.
docker-compose stop postgres
docker-compose up -d postgres
