const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'});
const response = require('cfn-response');
const crypto = require("crypto");

exports.handler = (event, context, cb) => {
  console.log(`Executing function with event: ${JSON.stringify(event)}`);
  const error = (err) => {
    console.log('Error while creating/updating/deleting the user pool domain.', err);
    response.send(event, context, response.FAILED);
  };
  if (event.RequestType === 'Delete') {
    cognito.deleteUserPoolDomain({
      Domain: event.PhysicalResourceId,
      UserPoolId: event.ResourceProperties.UserPoolId
    }, function(err, data) {
      if (err) {
        error(err);
      } else {
        console.log(`Deleted custom domain ${event.PhysicalResourceId} for user pool ${event.ResourceProperties.UserPoolId}`);
        response.send(event, context, response.SUCCESS, {}, event.PhysicalResourceId);
      }
    });
  } else if (event.RequestType === 'Create') {
    const randomDomain = event.RequestId;
    cognito.createUserPoolDomain({
      Domain: randomDomain,
      UserPoolId: event.ResourceProperties.UserPoolId,
    }, function(err, data) {
      if (err) {
        error(err);
      } else {
        console.log(`Created custom domain ${randomDomain} for user pool ${event.ResourceProperties.UserPoolId}`);
        response.send(event, context, response.SUCCESS, {}, randomDomain);
      }
    });
  } else if (event.RequestType === 'Update') {
    console.log(`Updating the domain name ${event.PhysicalResourceId} for ${event.ResourceProperties.UserPoolId} is not supported.`);
    response.send(event, context, response.SUCCESS, {}, event.PhysicalResourceId);
  } else {
    error(new Error(`unsupported request type: ${event.RequestType}`));
  }
};
