#!/bin/sh
bucketName="avp-user-data-src"
fileName="hw_200.csv"
objectPath="s3://${bucketName}/${fileName}"

aws s3 rm "${objectPath}"
aws s3 cp "${fileName}" "${objectPath}"
