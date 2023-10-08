import type {AWS} from '@serverless/typescript';

import confirmEmail from '@functions/confirm-email';
import register from "@functions/register";
import postUserCreated from "@functions/post-user-created";

const serverlessConfiguration: AWS = {
  service: 'poc-atlas-app-services-backend',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: {confirmEmail, register, postUserCreated},
  package: {individually: true},
  custom: {
    esbuild: {
      external: ["realm", "mongoose"],
      packager: "yarn",
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: {'require.resolve': undefined},
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
