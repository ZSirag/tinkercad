chrome.storage.local.get("togle", function (items) {
    if (items.togle == "true") {
        var navbar;
        var findElement = setInterval(() => {
            try {
                navbar = document.querySelector(".editor_actions");
                if (navbar != undefined) {addmenu();}
            } catch (err) {}
        }, 1000);
        function addmenu() {
            clearInterval(findElement);
            var btn = document.querySelector(".js-export");
            btn = btn.cloneNode(true);
            btn.classList.remove("js-export");
            btn.querySelector("a").id="zaza_btn";
            btn.title = "Settings";
            btn.querySelector(".circ_btn__txt").innerText = "Settings";
            navbar.appendChild(btn);
            var elem = `<div class="zaza_overlay"><div class="zaza_cont"><div class="header"><div class="text"><p>TINKERCAD - SOCKETS</p></div></div><div class="body"><div><select id="zaza_server"><option value="0" selected>Socket.io</option><option value="1">WebSocket</option> </select><br><input type="text" placeholder="Namespace" id="zaza_nsp" value="arduino"><input id="zaza_port" placeholder="Port" value="300"></div></div><button class="btn" id="zaza_hide">CLOSE</button></div></div>`;
            var doc = new DOMParser().parseFromString(elem, "text/html");
            document.querySelector("body").appendChild(doc.querySelector(".zaza_overlay"));
        }
    }
});