let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyparser = require("body-parser");

let mysql = require("mysql");
let connection = mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"pass123",
    database:"mechat"
  }
);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });


  app.get("/sendotp/:number",(req,res)=>{
    res.send({"status":"success","msg":"OTP has been send."+req.params.number});
  })

  app.get("/verifyotp/:number/:otp",(req,res)=>{
    connection.query("SELECT * FROM users WHERE mobile='"+req.params.number+"'",function(err,rows){
      if(rows.length>0)
      {
        rows[0]["status"]="success";
        res.send(rows[0]);
      }else{
        res.send({"status":"success","msg":"OTP Verified"+req.params.number});

      }

    })
  })

  app.post("/signup",(req,res)=>{
    let data=req.body;
    connection.query("SELECT * FROM users WHERE mobile='"+data.mobile+"'",function(err,rows){
      if(rows.length<=0)
      {

        connection.query("INSERT INTO users (`fullname`,`nickname`,`mobile`,`country`) VALUES ('"+data.fullname+"','"+data.nickname+"','"+data.mobile+"','"+data.country+"')",function(re){
          connection.query("SELECT * FROM users WHERE mobile='"+data.mobile+"'",function(err,rows){
          res.send(rows[0]);
          });
        })

      }else{
        res.send(rows[0]);
      }
    })
    
    
  })
  
  app.get("/login",(res,req)=>{
      res.send({name:"deepak",password:"123456"});
  })

  let onlineuser={};
 
io.on('connection', (socket) => {
    console.log("socket connected "+socket.id);
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});  
    console.log("socket disconnect "+socket.id); 
  });
 
  socket.on('login', (mobile) => {
    getData(mobile,function(res){
      socket.fullname=res.fullname;
      socket.nickname=res.nickname;
      socket.mobile=res.mobile;
      socket.userid=res.id;

      onlineuser[res.mobile]=socket;
      io.emit('users-changed', {user: res.mobile, event: 'joined'}); 

    });
      
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});

function getData(mobile,callback)
{
  connection.query("SELECT * FROM users WHERE mobile='"+mobile+"'",function(err,rows){
    if(rows.length>0)
    {
      callback(rows[0]);
    }
  })
}
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

// function insert(con,tbl,data)
// {
// }