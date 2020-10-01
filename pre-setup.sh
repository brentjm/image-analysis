#!/bin/bash

################################################################################
# Script name: pre-setup.sh
# Description: Pre-configuration (prior to running docker-compose)
#   - changes IP address of all files to host IP
# Args: None
# Author: Brent Maranzno
# email: brent_maranzano@gmail.com

# Usage:
# ./pre-setup.sh
################################################################################

# Get the IP address from the user
IP=$(ip -f inet -br address)
echo "Current IP addresses:"
echo "$IP"
read -p "Enter IP4V address of host > " IP

# Change host_ip_address string to appropriate IPv4 address
sed -ie s/host_ip_address/"$IP"/ ./nginx/html/index.html
sed -ie s/host_ip_address/"$IP"/ ./nginx/app.conf
