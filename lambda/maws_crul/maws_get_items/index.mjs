import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({})

const dynamo = DynamoDBDocumentClient.from(client)

const tableName = 'maws-files'

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    body = await dynamo.send(
      new ScanCommand({ TableName: tableName })
    )
    body = body.Items
  } catch (err) {
    statusCode = 400
    body = err.message
  } finally {
    body = JSON.stringify(body)
  }

  return {
    statusCode,
    body,
    headers,
  }
}
