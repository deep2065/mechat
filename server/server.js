let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
  app.get("/login",(res,req)=>{
      res.send({name:"deepak",password:"123456"});
  })
 
io.on('connection', (socket) => {
    console.log("socket connected "+socket.id);
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});  
    console.log("socket disconnect "+socket.id); 
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});