const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

const client = new AWS.DynamoDB.DocumentClient()

function getAll (tableName) {
  // Declare params for scan
  const params = {
    TableName: tableName
  }

  return new Promise((resolve, reject) => {
    // Scan table and return
    client.scan(params, (err, data) => {
      if(err) reject(err)
      else resolve(data.Items)
    })
  })
}

function get (tableName, id) {
  // Declare params for query
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'id = :hkey',
    ExpressionAttributeValues: {
      ':hkey': +id
    }
  }

  return new Promise((resolve, reject) => {
    // Query table and return
    client.query(params, (err, data) => {
      if (err) reject(err)
      else resolve(data.Items[0])
    })
  })
}

function put (tableName, item) {
  const params = {
    TableName: tableName,
    Item: item
  }
  return new Promise((resolve, reject) => {
    client.put(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = {
  get,
  getAll,
  put
}
