#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { AwsS3Stack } = require('../lib/aws-s3-stack');

const app = new cdk.App();
new AwsS3Stack(app, 'AwsS3Stack', {});
