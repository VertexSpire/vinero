#!/bin/sh

# injects values into .env file based on environmenal variables available at run time
ENV_FILE=/root/.env
echo "THM_NODE_CRON=''" >> $ENV_FILE
echo "THM_NODE_PROD_TYPE='$ENV'" >> $ENV_FILE
echo "NODE_ENV='$ENV'" >> $ENV_FILE
echo "SERVER_PORT=$SERVER_PORT" >> $ENV_FILE
echo "DOMAIN_URL='$DOMAIN_URL'" >> $ENV_FILE
echo "DOMAIN_NAME='$DOMAIN_NAME'" >> $ENV_FILE
echo "CHARGEBEE_SITE_ID='$CHARGEBEE_SITE_ID'" >> $ENV_FILE
echo "CHARGEBEE_API_KEY='$CHARGEBEE_API_KEY'" >> $ENV_FILE
echo "CHARGEBEE_USERNAME='$CHARGEBEE_USERNAME'" >> $ENV_FILE
echo "CHARGEBEE_PASSWORD='$CHARGEBEE_PASSWORD'" >> $ENV_FILE
echo "STRIPE_PUBLIC_KEY='$STRIPE_PUBLIC_KEY'" >> $ENV_FILE
echo "STRIPE_PRIVATE_KEY='$STRIPE_PRIVATE_KEY'" >> $ENV_FILE
echo "STRIPE_WEBHOOK_SECRET='$STRIPE_WEBHOOK_SECRET'" >> $ENV_FILE
echo "PAYPAL_MODE='$PAYPAL_MODE'" >> $ENV_FILE
echo "PAYPAL_CLIENT_ID='$PAYPAL_CLIENT_ID'" >> $ENV_FILE
echo "PAYPAL_SECRET='$PAYPAL_SECRET'" >> $ENV_FILE
echo "THM_EMAIL_ADDRESS='$THM_EMAIL_ADDRESS'" >> $ENV_FILE
echo "THM_PASSWORD_PASSWORD='$THM_PASSWORD_PASSWORD'" >> $ENV_FILE
echo "FAKE_USER_EMAIL='$FAKE_USER_EMAIL'" >> $ENV_FILE
echo "FAKE_USER_PASSWORD='$FAKE_USER_PASSWORD'" >> $ENV_FILE
echo "AMPLITUDE_KEY='$AMPLITUDE_KEY'" >> $ENV_FILE
echo "CUSTOMERIO_SITE_ID='$CUSTOMERIO_SITE_ID'" >> $ENV_FILE
echo "CUSTOMERIO_API_KEY='$CUSTOMERIO_API_KEY'" >> $ENV_FILE
echo "CLOUDFARE_DOMAIN='$CLOUDFARE_DOMAIN'" >> $ENV_FILE
echo "CLOUDFARE_ZONE_ID='$CLOUDFARE_ZONE_ID'" >> $ENV_FILE
echo "CLOUDFARE_TOKEN='$CLOUDFARE_TOKEN'" >> $ENV_FILE
echo "AWS_ACCESS_KEY='$AWS_ACCESS_KEY'" >> $ENV_FILE
echo "AWS_SECRET_KEY='$AWS_SECRET_KEY'" >> $ENV_FILE
echo "AWS_VM_UPLOAD_ACCESS_KEY_ID='$AWS_VM_UPLOAD_ACCESS_KEY_ID'" >> $ENV_FILE
echo "AWS_VM_UPLOAD_SECRET_ACCESS_KEY='$AWS_VM_UPLOAD_SECRET_ACCESS_KEY'" >> $ENV_FILE
echo "OPENVPN_API_KEY='$OPENVPN_API_KEY'" >> $ENV_FILE
echo "DB_PRIVATE_IP='$DB_PRIVATE_IP'" >> $ENV_FILE
echo "DB_PUBLIC_IP='$DB_PUBLIC_IP'" >> $ENV_FILE
echo "DB_URL='$DB_URL'" >> $ENV_FILE
echo "REDIS_IP='$REDIS_IP'" >> $ENV_FILE
echo "REDIS_PASSWORD='$REDIS_PASSWORD'" >> $ENV_FILE
echo "SESSION_SECRET='$SESSION_SECRET'" >> $ENV_FILE
echo "DEFAULT_ACCOUNT_USERNAME='$DEFAULT_ACCOUNT_USERNAME'" >> $ENV_FILE
echo "DEFAULT_ACCOUNT_USER_ID='$DEFAULT_ACCOUNT_USER_ID'" >> $ENV_FILE
echo "ELASTIC_API_KEY='$ELASTIC_API_KEY'" >> $ENV_FILE
echo "ELASTIC_USERNAME='$ELASTIC_USERNAME'" >> $ENV_FILE
echo "ELASTIC_PASSWORD='$ELASTIC_PASSWORD'" >> $ENV_FILE
echo "ELASTIC_INDEX='$ELASTIC_INDEX'" >> $ENV_FILE
echo "REFRESH_TOKEN='$REFRESH_TOKEN'" >> $ENV_FILE
echo "GOOGLE_OAUTH_CLIENT_ID='$GOOGLE_OAUTH_CLIENT_ID'" >> $ENV_FILE
echo "GOOGLE_OAUTH_CLIENT_SECRET='$GOOGLE_OAUTH_CLIENT_SECRET'" >> $ENV_FILE
echo "GOOGLE_OAUTH_CALLBACK_URL='$GOOGLE_OAUTH_CALLBACK_URL'" >> $ENV_FILE

# cloud training creds & stuff
echo "AWS_CLOUD_TRAINING_ACCESS_KEY_ID='$AWS_CLOUD_TRAINING_ACCESS_KEY_ID'" >> $ENV_FILE
echo "AWS_CLOUD_TRAINING_SECRET_KEY='$AWS_CLOUD_TRAINING_SECRET_KEY'" >> $ENV_FILE
echo "AWS_CLOUD_TRAINING_ROOT_OU='$AWS_CLOUD_TRAINING_ROOT_OU'" >> $ENV_FILE
echo "AWS_MOVE_OU_MACHINE_ARN='$AWS_MOVE_OU_MACHINE_ARN'" >> $ENV_FILE
echo "AWS_ASSIGN_ACC_MACHINE_ARN='$AWS_ASSIGN_ACC_MACHINE_ARN'" >> $ENV_FILE

# s3 bucket names and addresses
echo "S3_VM_UPLOAD_BUCKET_NAME='$S3_VM_UPLOAD_BUCKET_NAME'" >> $ENV_FILE
echo "S3_VM_UPLOAD_BUCKET_REGION='$S3_VM_UPLOAD_BUCKET_REGION'" >> $ENV_FILE
echo "S3_IMAGES_BUCKET_NAME='$S3_IMAGES_BUCKET_NAME'" >> $ENV_FILE
echo "S3_IMAGES_BUCKET_DOMAIN='$S3_IMAGES_BUCKET_DOMAIN'" >> $ENV_FILE
echo "S3_VPN_CONFIG_BUCKET_NAME='$S3_VPN_CONFIG_BUCKET_NAME'" >> $ENV_FILE
echo "S3_VPN_CONFIG_BUCKET_DOMAIN='$S3_VPN_CONFIG_BUCKET_DOMAIN'" >> $ENV_FILE
echo "S3_BADGES_BUCKET_NAME='$S3_BADGES_BUCKET_NAME'" >> $ENV_FILE
echo "S3_BADGES_BUCKET_DOMAIN='$S3_BADGES_BUCKET_DOMAIN'" >> $ENV_FILE
echo "S3_CERTIFICATES_BUCKET_NAME='$S3_CERTIFICATES_BUCKET_NAME'" >> $ENV_FILE
echo "S3_CERTIFICATES_BUCKET_DOMAIN='$S3_CERTIFICATES_BUCKET_DOMAIN'" >> $ENV_FILE


# inject AWS credentials
mkdir -p /root/.aws
AWS_CRED_FILE=/root/.aws/credentials
echo "[network-infra]" >> $AWS_CRED_FILE
echo "aws_access_key_id = $AWS_NETWORK_INFRA_ACCESS_KEY_ID" >> $AWS_CRED_FILE
echo "aws_secret_access_key = $AWS_NETWORK_INFRA_SECRET_ACCESS_KEY" >> $AWS_CRED_FILE

echo "[default]" >> $AWS_CRED_FILE
echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> $AWS_CRED_FILE
echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> $AWS_CRED_FILE

# create openvpn directories in each container
mkdir -p /usr/src/tryhackme/openvpn/EU-Regular-1
mkdir -p /usr/src/tryhackme/openvpn/EU-Regular-2
mkdir -p /usr/src/tryhackme/openvpn/EU-Regular-3
mkdir -p /usr/src/tryhackme/openvpn/US-West-Regular-1
mkdir -p /usr/src/tryhackme/openvpn/AU-Regular-1
mkdir -p /usr/src/tryhackme/openvpn/US-East-Regular-1
mkdir -p /usr/src/tryhackme/openvpn/IN-Regular-1
mkdir -p /usr/src/tryhackme/openvpn/EU-VIP-1
mkdir -p /usr/src/tryhackme/openvpn/US-West-VIP-1
mkdir -p /usr/src/tryhackme/openvpn/EU-VIP-2
mkdir -p /usr/src/tryhackme/openvpn/EU-Networks-1

# other folders that need to be created
mkdir -p /usr/src/tryhackme/views/uploaded/avatars/
mkdir -p /usr/src/tryhackme/views/uploaded/badges/
mkdir -p /usr/src/tryhackme/views/uploaded/certificates/
mkdir -p /usr/src/tryhackme/views/uploaded/room-badges/
mkdir -p /usr/src/tryhackme/views/uploaded/user_avatars/

# start the server
if [ "$THM_NODE_PROD_TYPE" = "prod" ]; then
  echo "Starting web service using pm2 ... "
  cd /usr/src/tryhackme && pm2 start index.js -i max && pm2 logs
else
  echo "Running npm start ... "
  npm start
fi
