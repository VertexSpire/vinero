# Use the official Ubuntu 20.04 as the base image
FROM ubuntu:20.04

# Set a default environment variable for NODE_ENV to 'dev'
# ARG allows setting build-time variables
ARG NODE_ENV=dev

# AWS credentials and S3 bucket details, used exclusively for pushing assets to S3 at build time.
# These variables are only used if NODE_ENV=prod and are discarded after build, so they won't be within containers at runtime.
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG ASSETS_S3_BUCKET_ADDRESS
ARG ASSETS_S3_BUCKET_NAME

# Update core repositories, install curl, git, and python3-pip.
# Use curl to download and install the Node.js setup script from NodeSource.
RUN apt-get update \
  && apt-get install -y curl git python3-pip \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash

# Install Node.js and npm, Guacapy, and dotenv using pip.
# Node.js and npm are installed to manage JavaScript dependencies.
# Guacapy is installed from a GitHub repository using pip.
# dotenv is installed using pip to manage environment variables.
RUN apt-get install -y nodejs && python3 -m pip install git+https://github.com/benspring/guacapy.git --ignore-installed && python3 -m pip install python-dotenv

# Set the working directory for the application.
# All subsequent paths will be relative to this directory.
WORKDIR /usr/src/ott

# Copy all source files from the host to the container's working directory.
COPY . .

# Run the deployment script to install dependencies, perform minification/obfuscation, and upload assets to S3.
# This step is crucial for preparing the application for production.
RUN ./deploy-assets.sh

# Expose port 1337 to allow external access to the app server.
EXPOSE 1337

# Set the entrypoint to the custom script that pushes environmental variables into ~/.env and starts the application.
ENTRYPOINT ["/usr/src/ott/docker-entrypoint.sh"]

