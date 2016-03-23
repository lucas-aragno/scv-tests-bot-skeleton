var WebSocket = require('ws'),
    apiToken = "", //Api Token from https://api.slack.com/web (Authentication section)
    authUrl = "https://slack.com/api/rtm.start?token=" + apiToken,
    request = require("request"),
    userId = 'U0375BYGC', // Id for the user the bot is posting as
    channelId = 'G06E6NZ89'; // Id of the channel the bot is posting to

request(authUrl, function(err, response, body) {
  if (!err && response.statusCode === 200) {
    var res = JSON.parse(body);
    if (res.ok) {
      connectWebSocket(res.url);
    }
  }
});

function connectWebSocket(url) {
  var ws = new WebSocket(url);

  ws.on('open', function() {
      console.log('Connected');
  });

  ws.on('message', function(message) {
      console.log('received:', message);

      message = JSON.parse(message);

      if (message.channel === channelId && message.type === 'message' && message.user !== userId) {
          ws.send(JSON.stringify({
              channel: message.channel, 
              id: 1, 
              text: 'Hola viteh', 
              type: "message"
          }));
      }
  });
}
