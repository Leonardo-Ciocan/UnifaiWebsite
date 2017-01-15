var express = require('express')
var app = express()
console.log(__dirname + "/app/js/");
app.use(express.static(__dirname + "/app/"))

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/app/res/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})