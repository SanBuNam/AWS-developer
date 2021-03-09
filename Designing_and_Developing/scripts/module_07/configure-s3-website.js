const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })
const s3 = new AWS.S3()

configureS3Site('/* TODO: Add your S3 bucket name */')
.then(data => console.log(data))

function configureS3Site (bucketName) {
  const params = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      IndexDocument: {
        Suffix: 'index.html'
      }
    }
  }

  return new Promise((resolve, reject) => {
    s3.putBucketWebsite(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
