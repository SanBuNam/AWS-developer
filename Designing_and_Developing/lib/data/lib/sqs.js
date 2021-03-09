const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1' })

const sqs = new AWS.SQS()

function push (queueName, msg) {
  const params = {
    QueueName: queueName
  }

  return new Promise((resolve, reject) => {
    // Get sqs queue URL
    sqs.getQueueUrl(params, (err, data) => {
      if (err) reject(err)
      else {
        // Then send message to queue url
        const params = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: data.QueueUrl
        }

        sqs.sendMessage(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })

  })
}

module.exports = { push }
