// Imports
const AWS = require('aws-sdk')
const cfParams = require('./cloudfront-parameters')

AWS.config.update({ region: 'us-west-2' })
// Create CloudFront SDK Object
const cf = new AWS.CloudFront()

createDistribution('hamster-bucket-david') // /* Add your bucket name */
.then(data => console.log(data))

function createDistribution (bucketName) {
  const params = {
    DistributionConfig: {
      CallerReference: `${Date.now()}`,
      Comment: 'HBFL Distribution',
      DefaultCacheBehavior: cfParams.defaultCacheBehavior(bucketName),
      Origins: cfParams.origins(bucketName),
      HttpVersion: 'http2',
      PriceClass: 'PriceClass_100',
      IsIPV6Enabled: true,
      Enabled: true
    }
  }

  return new Promise((resolve, reject) => {
    cf.createDistribution(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
