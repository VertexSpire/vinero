FROM ubuntu:20.04

# have a default env of 'dev'
ARG NODE_ENV=dev

# AWS creds used exclusively for pushing assets to S3 at build time.
# Only used if NODE_ENV=prod. You can leave blank otherwise.
# These vars are discarded after build, so they won't be within containers at runtime
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG ASSETS_S3_BUCKET_ADDRESS
ARG ASSETS_S3_BUCKET_NAME

# update core repositories, install curl + git, get script to install node depencencies
RUN apt-get update \
  && apt-get install -y curl git python3-pip\
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash


# install npm, nodejs, guacapy and dotenv
RUN apt-get install -y nodejs && python3 -m pip install git+https://github.com/benspring/guacapy.git --ignore-installed && python3 -m pip install python-dotenv

# Setting work directory. All the paths will be relative to WORKDIR
WORKDIR /usr/src/ott

# Copy source files
COPY . .

# installing dependencies, performing minification/obfuscation, uploading to S3, etc
RUN ./deploy-assets.sh

# Expose the app server port
EXPOSE 1337

# Push environmental variables (at run time) into ~/.env and start the app
ENTRYPOINT ["/usr/src/ott/docker-entrypoint.sh"]
