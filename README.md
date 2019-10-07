[![Build Status](https://travis-ci.org/cfn-modules/cognito-userpool.svg?branch=master)](https://travis-ci.org/cfn-modules/cognito-userpool)
[![NPM version](https://img.shields.io/npm/v/@cfn-modules/cognito-userpool.svg)](https://www.npmjs.com/package/@cfn-modules/cognito-userpool)

# cfn-modules: Amazon Cognito User Pool

An Amazon Cognito User Pool with domain and client.


## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/cognito-userpool
```

## Usage

```
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'cfn-modules example'
Resources:
  Queue:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        InitialUser: 'hello@widdix.de' # optional
      TemplateURL: './node_modules/@cfn-modules/cognito-userpool/module.yml'
```

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required?</th>
      <th>Allowed values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>InitialUser</td>
      <td></td>
      <td>The email address for initial user (temporary password via email).</td>
      <td>no</td>
      <td>Valid email address</td>
    </tr>
  </tbody>
</table>

## Limitations

* Secure: Does not backup/snapshot the users stored in the user pool.

## Migration Guides

### Migrate to v2

We are replacing a custom resource with the newly added `AWS::Cognito::UserPoolDomain`. Therefore, we need to change the randomly generated domain name. 

1. Temporary disable the `CognitoUserPoolModule` from all [ecs-alb-target](https://github.com/cfn-modules/ecs-alb-target) modules. Alternatively, you can also delete all stacks containing the `ecs-alb-target` module.
1. Upgrade to version `2.0.0` of `cognito-userpool`.
1. Enable the `CognitoUserPoolModule` from all [ecs-alb-target](https://github.com/cfn-modules/ecs-alb-target) modules.
