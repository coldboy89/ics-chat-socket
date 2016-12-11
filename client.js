$(document).ready(function(){
	var socket = io.connect('http://127.0.0.1:8080');
	socket.on('new-user', function(data){
        alert(data + ' Have joined!');
    })

	socket.on('greeting', function(data){
		alert(data);
		console.log('123123');
	})

	$('#go').click(function(){
		socket.emit('user-join',$('#name').val());
	})
})