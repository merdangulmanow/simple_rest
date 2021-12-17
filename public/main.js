'use strict';

(function() {

  var socket = io();

  socket.on('connect', onConnect);

  function onConnect(){

    const data = {
      socket_id : socket.id,
      user_id : 123,
      message : "Hello server"
    }
    socket.emit("message", data)
    

    socket.on("new_message", function(data){
      console.log("new message:");
      console.log(data);
    })

    socket.on("hello", function(data){
      console.log(".................hello says:");
      // console.log(data);
    })

  }

})();
