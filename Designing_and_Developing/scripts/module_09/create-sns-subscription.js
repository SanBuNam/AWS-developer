const AWS = require('aws-sdk')
AWS.config.update({ region: 'usa-west-1' })

const sns = new AWS.SNS()
const type = 'sms'
const endpoint = '17142747552'
const topicArn = 'arn:aws:sns:us-weat-1:180732999116:hamster-topic'

createSubscription(type, topicArn, endpoint)
.then(data => console.log(data))

function createSubscription (type, topicArn, endpoint) {
  const params = {
    Protocol: type,
    TopicArn: topicArn,
    Endpoint: endpoint
  }

  return new Promise((resolve, reject) => {
    sns.subscribe(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
