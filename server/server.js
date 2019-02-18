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
    res.header("Access-Control-Request-Headers","*");
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
  
  app.get("/getfriends/:id",(req,res)=>{
    connection.query("SELECT u.* FROM users as u join friends as f on u.mobile=f.mobile where f.user_id="+req.params.id,function(err,rows){
      if(rows.length>0)
      {
        res.send(rows);
      }else{
        res.send({"status":"success","msg":"Friends not found"});

      }

    })
  })

  app.post("/savecontact",(req,res)=>{ 
    let data=req.body;
    data.mobile = data.mobile.replace(/(\+91)/g, "");
    data.mobile = data.mobile.replace(/\s/g, "");
    connection.query("SELECT * FROM friends WHERE mobile='"+data.mobile+"' and user_id='"+data.uid+"'",function(err,rows){
      if(rows.length<=0)
      {

        

        connection.query("INSERT INTO friends (`user_id`, `name`, `mobile`, `country`) VALUES ('"+data.uid+"','"+data.name+"','"+data.mobile+"','"+data.country+"')",function(re){
         
          res.send({"status":"success","msg":"contact imported"});
        })

      }else{
        res.send({"status":"success","msg":"contact already imported"});
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

      onlineuser[res.id]=socket;
     // offlineMesaage(socket); 

    });
      
  });
  
  socket.on('add-message', (message) => {
    
    message.status="0";
    if(onlineuser[message.r_id] != undefined)
    {
      onlineuser[message.r_id].emit("message",message);
      message.status="1";
    }

    savemessage(message);
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

function savemessage(data)
{
  connection.query("INSERT INTO messages (`msg`, `s_id`, `r_id`, `status`) VALUES ('"+data.msg+"','"+data.s_id+"','"+data.r_id+"','"+data.status+"')",function(re){
  })
}

function offlineMesaage(socket)
{
  connection.query("SELECT * FROM message WHERE r_id='"+socket.userid+"' and ststus='0'",function(err,row){
    if(rows.legth>0)
    {
      rows.forEach(element => {
        socket.emit("message",element);
        connection.query("UPDATE message set status='1' WHERE id='"+element.id+"'",function(err){

        });
      });

    }
  });
}
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});

// function insert(con,tbl,data)
// {
// }