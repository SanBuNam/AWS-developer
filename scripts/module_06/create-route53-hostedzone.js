const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })

// Create route53 object
const route53 =  new AWS.Route53()
const hzName = 'hbfl.online'

createHostedZone(hzName)
.then(data => console.log(data))

function createHostedZone (hzName) {
  // Create params const
  const params = {
    Name: hzName,
    CallerReference: `${Date.now()}`
  }

  return new Promise((resolve, reject) => {
    // Create hostedzone with route53
    route53.createHostedZone(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
