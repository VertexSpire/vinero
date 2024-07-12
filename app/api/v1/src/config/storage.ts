// src/config/storage.ts

/**
 * Configuration for different storage services.
 */
export const storageConfig = {
  s3: {
    bucketName: 'your-s3-bucket-name',
    region: 'your-region',
    accessKeyId: 'your-access-key-id',
    secretAccessKey: 'your-secret-access-key',
  },
  azure: {
    accountName: 'your-account-name',
    accountKey: 'your-account-key',
    containerName: 'your-container-name',
  },
  google: {
    bucketName: 'your-google-bucket-name',
    projectId: 'your-project-id',
    keyFilename: 'path-to-your-service-account-key.json',
  },
};
