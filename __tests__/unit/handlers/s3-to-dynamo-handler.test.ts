import { mock, restore } from 'aws-sdk-mock'
import { S3CreateEvent } from 'aws-lambda'
import { AWSError } from 'aws-sdk/lib/error'
import { GetObjectOutput, GetObjectRequest } from 'aws-sdk/clients/s3'

describe('Test s3JsonLoggerHandler', () => {
  it('should read and log S3 objects', async () => {
    const objectBody = '{"Test": "PASS"}'
    const getObjectResp = {
      Body: objectBody
    }

    mock('S3', 'getObject', function (params: GetObjectRequest, callback: (err: unknown, data: GetObjectOutput) => void) {
      callback(null, getObjectResp)
    })

    const event = {
      Records: [
        {
          s3: {
            bucket: {
              name: 'test-bucket'
            },
            object: {
              key: 'test-key'
            }
          }
        }
      ]
    }

    console.info = jest.fn()

    const { s3ToDynamoHandler } = require('../../../src/handlers/s3-to-dynamo')

    await s3ToDynamoHandler(event as S3CreateEvent)

    expect(console.info).toHaveBeenCalledWith(objectBody)
    restore('S3')
  })
})
