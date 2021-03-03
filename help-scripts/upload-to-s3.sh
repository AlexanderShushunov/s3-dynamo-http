#!/bin/sh
bucketName="avp-user-data-src"
fileName="ex.json"
objectPath="s3://${bucketName}/${fileName}"

aws s3 rm "${objectPath}"
aws s3 cp "${fileName}" "${objectPath}"
