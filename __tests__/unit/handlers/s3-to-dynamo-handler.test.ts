import { mock, restore } from 'aws-sdk-mock'
import { S3CreateEvent } from 'aws-lambda'
import fs from 'fs'
import path from 'path'
import { writeToDynamo } from '../../../src/handlers/writeToDynamo'

jest.mock('../../../src/handlers/writeToDynamo')

const dataFilePath = path.join(__dirname, './user-data.csv')

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

    const { s3ToDynamoHandler } = require('../../../src/handlers/s3ToDynamoHandler')

    await s3ToDynamoHandler(event as S3CreateEvent)

    expect(writeToDynamo).toHaveBeenCalledTimes(3)
    expect(writeToDynamo).toHaveBeenCalledWith({
      segment: 'normal',
      uuid: 'f7b2759a-6d49-4041-8f76-e678dd46f898'
    })
    restore('S3')
  })
})
