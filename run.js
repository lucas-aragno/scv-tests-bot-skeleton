require('dotenv').config() // CONFIG ALL THE THINGS
var defaultTarget = process.env.DEFAULT_TARGET
var doRequest = require('./utils/doRequest')
var insertUser = require('./utils/dbUtils').insertUser
var findUserByName = require('./utils/dbUtils').findUserByName
var loki = require('lokijs')
var _ = require('lodash') // I could just use the functions that I need but meh
var db = new loki('loki.json') // In memory db 4 the winz
var WebSocket = require('ws')
var apiToken = process.env.SLACK_API_KEY // Api Token from https://api.slack.com/web (Authentication section)
var baseUrl = 'https://slack.com/api/'
var authUrl = baseUrl + 'rtm.start?token=' + apiToken
var userListUrl = baseUrl + 'users.list?token=' + apiToken
var userId = '' // Id for the user the bot is posting as
var channelId = '' // Id of the channel the bot is posting to
var users = {}
var processMessage = require('./utils/messageRouter')


function setDefaultTarget (member) {
  var user = users[member]
  if (user) {
    users[member] = {
       id: user.id,
       bother_me: true
    }
  }
}

doRequest(userListUrl, function (res) {
   _.each(res.members, function (member) {
     insertUser(users, member)
   })
   setDefaultTarget(defaultTarget)
})

doRequest(authUrl, function (res) {
  connectWebSocket(res.url)
})



/*
(function startRant (defaultTarget) {
  var user = findUserByName(defaultTarget)
  console.log('MY TARGET IS:', user)
})()
*/

function connectWebSocket (url) {
  var ws = new WebSocket(url)

  ws.on('open', function () {
    console.log('Connected')
  })

  ws.on('message', function (message) {
    message = JSON.parse(message)

    if (message.type === 'message') {
      processMessage(message, ws, users)
    }
    /*
      console.log('message chan: ', message.channel)
      console.log('message user: ', message.user)

      if (message.channel === channelId && message.type === 'message' && message.user !== userId) {
          ws.send(JSON.stringify({
              channel: message.channel,
              id: 1,
              text: 'Hola viteh',
              type: "message"
          }));
      }
      */
  })
}
