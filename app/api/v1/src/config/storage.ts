// src/config/storage.ts

/**
 * Configuration for different storage services.
 * This configuration holds credentials and details required to connect to each storage service.
 */
export const storageConfig = {
  s3: {
    /**
     * Name of the S3 bucket.
     * This is the bucket where files will be stored.
     */
    bucketName: 'your-s3-bucket-name',

    /**
     * AWS region where the S3 bucket is hosted.
     * Example: 'us-east-1'.
     */
    region: 'your-region',

    /**
     * AWS access key ID.
     * This key is used to authenticate requests to AWS services.
     */
    accessKeyId: 'your-access-key-id',

    /**
     * AWS secret access key.
     * This secret key is used along with the access key ID to sign programmatic requests to AWS.
     */
    secretAccessKey: 'your-secret-access-key',
  },
  azure: {
    /**
     * Azure storage account name.
     * This is the name of your Azure storage account.
     */
    accountName: 'your-account-name',

    /**
     * Azure storage account key.
     * This key is used to authenticate requests to Azure Blob Storage.
     */
    accountKey: 'your-account-key',

    /**
     * Azure Blob Storage container name.
     * This is the container within your storage account where files will be stored.
     */
    containerName: 'your-container-name',
  },
  google: {
    /**
     * Google Cloud Storage bucket name.
     * This is the bucket where files will be stored.
     */
    bucketName: 'your-google-bucket-name',

    /**
     * Google Cloud project ID.
     * This ID identifies your Google Cloud project.
     */
    projectId: 'your-project-id',

    /**
     * Path to your Google Cloud service account key file.
     * This file contains credentials for your service account.
     */
    keyFilename: 'path-to-your-service-account-key.json',
  },
};
