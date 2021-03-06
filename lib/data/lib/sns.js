const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1' })

const sns = new AWS.SNS()
const TOPIC_ARN = 'arn:aws:sns:us-west-1:1804245641:hamster-topic'

function publish (msg) {
  const params = {
    TopicArn: TOPIC_ARN,
    Message: msg
  }

  return new Promise((resolve, reject) => {
    sns.publish(params, (err,data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = { publish }
