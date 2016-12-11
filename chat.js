var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket){
	
	// login - add user
	socket.on('client login', function(data){
		var username = data.username;
		clients[username] = {
			"socket": socket.id
		};
		socket.emit('client login success', data);
		socket.broadcast.emit('client notice',username + ' had just login');
		console.log(username + ' connected');
	});

	// process send massage
	socket.on('send message server', function(data){
		console.log(data.username + ' message: ' + data.message);
		io.emit('send message client', data);
	});

	// disconect process
	socket.on('disconnect', function(){
		for(var name in clients) {
			if(clients[name].socket === socket.id) {
				delete clients[name];
				console.log(name + ' disconnected');
				break;
			}
		}
	});

});

io.emit('chat message', { for: 'everyone' });

http.listen(3000, function(){
	console.log('listening on *:3000');
});