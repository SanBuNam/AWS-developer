// Import the aws-sdk
const AWS = require('aws-sdk')
// Configure region
AWS.config.update({ region: 'us-east-1' })
// Declare local variables
// Create an ec2 object
const ec2 = new AWS.EC2();

function listInstances () {
  // List instances using ec2.describeInstances()
  return new Promise((resolve, reject) => {
    ec2.describeInstances({}, (err, data) => {
      if (err) reject(err)
      else {resolve(data.Reservations.reduce((i, r)=> {
        return i.concat(r.Instances)
      }, []))}
    })
  })
}

function terminateInstance (instanceId) {
  // Terminate an instance with a given instanceId
  const params = {
    InstanceIds: [
      instanceId
    ]
  }

  return new Promise((resolve, reject) => {
    ec2.terminateInstance(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

listInstances()
.then(data => console.log(data))
// terminateInstance('i-0733b5248eeb48563')
// .then(data => console.log(data))
