const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-1' })

const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = 'arn:aws:sns:us-west-1:180732999166:hamser-topic'
const tg = 'targetgroup/hamsterTG/51ad9a5e69e6b027'
const lb = 'app/hamsterELB/2b9e1228eee02e50'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
.then(data => console.log(data))

function createCloudWatchAlarm (alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Demensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      }, {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching'
  }

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(parms, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
