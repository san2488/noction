var express = require('express'), 
    app = express(), 
    http = require('http'), 
    server = http.createServer(app);

var highestBid = 0;

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.configure(function() {
   app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.render('home.jade');
});

var jade = require('jade');

var io = require('socket.io').listen(server);

server.listen(3000);

io.sockets.on('connection', function (socket) {
    socket.on('addItem', function (data) {
       socket.set('item', data, function() {
            console.log('Adding item: ' + data);
            socket.broadcast.emit('showItem', data);
       });
    });

    socket.on('bid', function (amount) {
        if(amount > highestBid) {
            highestBid = amount;
            socket.broadcast.emit('setHighestBid', highestBid);
        }
    });
});