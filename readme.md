# TinkerCad to Socket


### This extension permit to simulate serial comunication between arduino on tinkercad and PC programs with TCP Socket protocol  

# Installation process on the browser in dev-mode on chromium browsers

1. download and unzip this repo on your pc 
2. open a chromium based browser (Chrome native browser, Chromium, Microsoft Edge chromium version, etc...) 
3. go to extension tab 
4. switch on development mode
5. click on upload uncompressed and navigate to the unzipped file
6. select the extension folder


# Test the extension
1. install socket.io module for nodejs using ``` npm install socket.io ``` 
2. write down your code, in oder to get data from tinkercad you have write:
```javascript
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

```

# External library

socket.io library: https://socket.io/ or https://github.com/socketio

# Report bugs or issue

In order to report bugs and issues contact me at zahir_sirag@outlook.it

# COMING SOON

Tutorial to use this extention.