//NATIVE ELEMENT VARIABLE
let monitor, monitorInput, monitorClear, monitorSend, simBtn;

//CUSTOM ELEMENT VARIABLES
let settings, overlay, port, nsp, server; 

//LOGICS VARIABLE
let con;

function start(){
    //NATIVE ELEMENT
    monitor = document.querySelector(".code_panel__serial__content__text");
    monitorClear = document.querySelector(".js-code_panel__serial__clear");
    monitorInput = document.querySelector(".code_panel__serial__input");
    monitorSend =  document.querySelector(".code_panel__serial__button");
    simBtn = document.querySelector("#SIMULATION_ID");
    
    //CUSTOM ELEMENT
    overlay = document.querySelector(".zaza_overlay");
    server = overlay.querySelector("#zaza_server");
    nsp = overlay.querySelector("#zaza_nsp");
    port = overlay.querySelector("#zaza_port");

    //EVENTS
    simBtn.addEventListener("click", simulation);
    monitor.addEventListener('DOMSubtreeModified', serialData);
    settings.addEventListener("click", ()=>{
        overlay.style.display = "flex";
    });
    overlay.querySelector("#zaza_hide").addEventListener("click", ()=>{
        overlay.style.display = "none";  
    });
    
}

function simulation() {
    if(simBtn.classList.length == 8){
        let connLink = `${port.value}/${nsp.value}`;
        if(server.value == "0"){
            con = io(`http://localhost:${connLink}`,  {reconnection: false});
            con.on("send", (x)=>{serial(x);});
            con.on("connect_error", ()=> {
                alert("Socket.io: Server is off, turn off the extention and start the simulation or start a Websocket server!");
                simBtn.click();
            })
        }
        else{
            con = new WebSocket(`ws://localhost:${connLink}`)
            con.addEventListener("message", (e)=>{
                serial(e.data);
            });
            con.addEventListener("error", ()=> {
                simBtn.click();
                return alert("Websocket: Sever is off, turn off the extention and start the simulation or start a Websocket server!");
            })
        }
    }
}

function serial(x) {
    monitorInput.value = x;
    monitorSend.click();
}
function sendMsg(data) {
    if(server.value == "1"){con.send(data);}
    else{con.emit("msg", data);}
}

function serialData() {
    let lines = monitor.innerText.split(/\r\n/g);
    if(lines.length > 1){
        sendMsg(lines.join("\n"));
        monitorClear.click();
    }
}

//DETECT EXTENTION ON OR OFF
chrome.storage.local.get("togle", function (items) {
    if (items.togle == "true") {
        let findElement = setInterval(() => {
            try {
                settings = document.querySelector("#zaza_btn");
                if (settings != undefined) {
                    start();
                    clearInterval(findElement);
                }
            } catch (err) {}
        }, 1000);
    }
})

