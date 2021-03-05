#!/bin/sh
bucketName="avp-user-data-src"
fileName="user-data.csv"
objectPath="s3://${bucketName}/${fileName}"

aws s3 rm "${objectPath}"
aws s3 cp "${fileName}" "${objectPath}"
