import { mock, restore } from 'aws-sdk-mock'
import { S3CreateEvent } from 'aws-lambda'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(__dirname, './user-data.csv');

describe('Test s3JsonLoggerHandler', () => {
  it('should read and log S3 objects', async () => {

    mock(
      'S3',
      'getObject',
      fs.readFileSync(dataFilePath)
    )

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

    expect(console.info).toHaveBeenCalledWith('{"uuid":"f7b2759a-6d49-4041-8f76-e678dd46f898","segment":"normal"}')
    restore('S3')
  })
})
