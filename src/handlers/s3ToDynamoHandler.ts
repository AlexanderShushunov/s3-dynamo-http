import { S3CreateEvent } from 'aws-lambda'
import { S3 } from 'aws-sdk'
import csvParser from 'csv-parser'
import { writeToDynamo } from './writeToDynamo'

const s3 = new S3()

type Record = {
  uuid: string,
  segment: string
}

export const s3ToDynamoHandler = async (event: S3CreateEvent) => {
  const getObjectRequests = event.Records.map(record => {
    return new Promise((resolve) => {
      const writesResult: Array<Promise<unknown>> = []
      const params = {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key
      }
      s3.getObject(params).createReadStream()
        .pipe(csvParser())
        .on('data', (data: Record) => {
          writesResult.push(writeToDynamo(data))
        })
        .on('end', () => {
          Promise.all(writesResult).then(resolve)
        })
    })
  })
  await Promise.all(getObjectRequests)
  console.debug('Complete!')
}
