# AVP
It is [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) project.

WORK IN PROGRESS!

How it works:
 - somebody uploads a csv file to a S3 bucket (see AppBucketName in template.yaml) 
 I use `avp-user-data-src`. It is hardcoded in `events/event-s3.json` and `help-scripts/upload-to-s3.sh`
 - lambda S3ToDynamoFunction reads this file and puts the data do DynamoDB
 - lambda receives http request with user id and returns user's cluster from DB
 
## Build
```bash
sam build
```

## Deploy to AWS
```bash
sam build
sam deploy
```
You can use `help-scripts/upload-to-s3.sh` to test it on AWS.

## For local run
Remove `.aws-sam` folder.
```bash
npm i
npm run watch
```
In a separate terminal 
```bash
sam local invoke S3ToDynamoFunction --event-name ./events/event-s3.json
```

## Clean-up
```bash
aws cloudformation delete-stack --stack-name {stack-name}
```

Resources:
- https://evilmartians.com/chronicles/serverless-typescript-a-complete-setup-for-aws-sam-lambda