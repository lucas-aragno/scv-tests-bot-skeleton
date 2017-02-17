var getUserToBother = require('./dbUtils').getUserToBother
var dontBotherUser = require('./dbUtils').dontBotherUser
var botherUser = require('./dbUtils').botherUser
var _ = require('lodash')

var bardos = [
 'quien te conoce papa',
 'no te doy bola, no ves que no te doy bola',
 'tomatela',
 'me importa un carajo',
 'cuantas copas tenes'
]

function processMessage (message, ws, users) {
  var text = message.text
  if (_.includes(text, 'bardear a')) {
    botherUser(users, text.replace(new RegExp('bardear a ', 'g'), ''))
  } else if (_.includes(text, 'pls stop for')) {
    dontBotherUser(users, text.replace(new RegExp('pls stop for ', 'g'), ''))
  } else if (shouldBardear(message, users)) {
    postBardo(ws, message.channel)
  }
  /*
  console.log('text is', text)
  switch (text) {
    case text.indexOf('pls stop') > 0:
      console.log('stop')
      break
    case text.indexOf('bardear a ') > -1:
      console.log('DEBERIA BARDEAR A JULITO')
      break
    default:
      if (shouldBardear(message, users)) {

      } else {
        return
      }
  }*/
}

function shouldBardear (message, users) {
  var results = getUserToBother(users, message.user)
  return results.length > 0
}

function postBardo (ws, channel) {
  ws.send(JSON.stringify({
    channel: channel,
    id: 1,
    text: bardos[Math.floor(Math.random() * bardos.length)],
    type: 'message'
  }))
}

module.exports = processMessage
