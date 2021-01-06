//declare library
const socket = require('socket.io')(300,{
  cors:true,
  origins:["https://www.tinkercad.com/things/*/editel"],
}); 

const Arduino = socket.of("/arduino");
Arduino.on("connection", (tinkercad)=>{
  tinkercad.on("msg", (data)=> {
    console.log(data);
  })
})