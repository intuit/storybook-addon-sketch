@Library('fuego-libraries') _
def nodeImage = 'adierkens/vulcan:latest'
def jenkinsRole = 'arn:aws:iam::733536204770:role/design-systems-prd-jenkins'

pipeline {
  agent {
    kubernetes {
        // Use a dynamic pod name because static labels are known to cause pod creation errors.
        label "node-pod-${UUID.randomUUID().toString()}"
        defaultContainer "nodejs"
        yaml """
        apiVersion: v1
        kind: Pod
        metadata:
          annotations:
            iam.amazonaws.com/role: ${jenkinsRole}
        spec:
            containers:
            - name: nodejs
              image: '${nodeImage}'
              command:
              - cat
              tty: true
        """
    }
  }
  options {
    timestamps()
    buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '50', artifactNumToKeepStr: '30'))
  }
  environment {
    PATH = "node_modules/.bin/:$PATH"
    GH_TOKEN = credentials('NATIVE_APPS_GH_TOKEN')
    NPMRC_IBP_AUTH = credentials('NPMRC_ARTIFACTORY_IBP')
    OWNER='design-systems'
    REPO = 'storybook-addon-sketch'
    GITHUB_CREDENTIALS = credentials("NATIVE_APPS_GH_LOGIN")
    GITHUB_USER = "${env.GITHUB_CREDENTIALS_USR}"
    GITHUB_TOKEN = "${env.GITHUB_CREDENTIALS_PSW}"
  }
  stages {
    stage('Check Skip CI') {
      steps {
        script { 
          checkout scm
          result = sh (script: "git log -1 | grep '.*\\[skip ci\\].*'", returnStatus: true)
          if (result == 0) {
              echo ("'Skip CI' spotted in git commit. Aborting.")
              currentBuild.result = 'ABORTED'
              error('Exiting job');
          }
        }
      }
    }
    stage('Auth') {
      steps {
        sh "cp -f $NPMRC_IBP_AUTH ~/.npmrc"
      }
    }
    stage('Install') {
      steps {
        sh 'yarn install --frozen-lockfile'
      }
    }
    stage('Build') {
        steps {
            sh 'yarn build'
        } 
    }
    stage('Publish') {
        steps {
            sh '''
            echo "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.intuit.com" >> /tmp/gitcredfile
            git config --global user.name "${GITHUB_USER}"
            git config --global user.email "andrew_lisowski@intuit.com"
            git config --global credential.helper "store --file=/tmp/gitcredfile"
            '''
            sh 'git fetch origin'
            sh 'git checkout master'
            sh 'auto shipit -w'
        }
    } 
  }
}
