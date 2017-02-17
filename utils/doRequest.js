var request = require('request')

function doRequest (url, cb) {
  request(url, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      var res = JSON.parse(body)
      if (res.ok) {
        cb(res)
      }
    }
  })
}

module.exports = doRequest
