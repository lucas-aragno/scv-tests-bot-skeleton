var loki = require('lokijs')
var db = new loki('loki.json') // In memory db 4 the winz
var _ = require('lodash')

function executeQuery (collection, query) {
  var collection = db.addCollection(collection)
  try {
    var test = query(collection)
    console.log(test)
    return query(collection)
  } catch (e) {
    throw 'Something stupid happened to the DB'
  }
}

function insertUser (users, user) {
  users[user.name] = {
    id: user.id,
    bother_me: false
  }
}

function botherUser (users, user) {
  console.log('START BOTHER ', user)
  var oldUser = users[user]
  if (oldUser) {
    users[user.name] = {
      id: oldUser.id,
      bother_me: true
    }
  }
}

function dontBotherUser (users, user) {
  console.log('STOP BOTHERING ', user)
  var oldUser = users[user]
  if (oldUser) {
    users[user.name] = {
      id: oldUser.id,
      bother_me: false
    }
  }
}

function getUserToBother (users, user) {
  return _.filter(users, function (o) { return o.id === user && o.bother_me })
}

function findUserById (slackId) {
  executeQuery('users', function (users) {
    users.find({'slack_id': slackId})
  })
}

function findUserByName (name) {
  return executeQuery('users', function (users) {
    users.find({'name': name})
  })
}

function insertBardo (user, message) {
  executeQuery('bardos', function (bardos) {
    console.log('INSERTING ', message, ' for ', user)
    var bardoList = bardos.find({'user': user})
    if (bardoList) {
      bardoList.list.push(message)
      bardos.insert(bardoList)
    } else {
      bardos.insert({user: user, list: [message]})
    }
  })
}

module.exports = {
  insertUser: insertUser,
  getUserToBother: getUserToBother,
  botherUser: botherUser,
  dontBotherUser: dontBotherUser
}
