var app = require("express")()
var http = require("http").Server(app)
var moment = require("moment")
var io = require("socket.io")(http)
var port = process.env.PORT || 5000

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", function(socket){
  socket.on("message", function(msg){
    io.emit("message", {time: moment().format("mm:ss"), message: msg})
  })
})

http.listen(port, function(){
  console.log("listening on *:" + port)
})
