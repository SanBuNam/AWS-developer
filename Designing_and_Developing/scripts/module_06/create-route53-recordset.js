const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z@8LUDOK29M3AN-sample'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  // Create params const
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        { 
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'hbfl.online',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-1470466383.us-west-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZonId: 'Z18D5FSROUN65G'
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    // Create record set
    route53.changeResourceRecordsets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
