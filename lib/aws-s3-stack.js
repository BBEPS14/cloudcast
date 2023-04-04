const iam = require('aws-cdk-lib/aws-iam');
const s3 = require('aws-cdk-lib/aws-s3');
const cdk = require('aws-cdk-lib');

class AwsS3Stack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'my-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedOrigins: ['*'],
          allowedMethods: [s3.HttpMethods.POST],
        },
      ],
    });

    bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
        actions: ['s3:GetObject'],
        resources: [`${bucket.bucketArn}/*`],
      })
    );

    bucket.policy?.document.addStatements(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('lambda.amazonaws.com')],
        actions: ['s3:GetBucketTagging'],
        resources: [bucket.bucketArn],
      })
    );
  }
}

module.exports = { AwsS3Stack };
