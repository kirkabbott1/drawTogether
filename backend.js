var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var hist = [];

app.use(express.static('public'));

io.on('connection', function(socket) {
  socket.emit("drawHist", hist);

  socket.on('draw', function(coords) {
    hist.push(coords);
    socket.broadcast.emit('sent draw', coords);
  });
});

http.listen(8000, function() {
  console.log('listening 8000');
});
