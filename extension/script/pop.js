let x = document.querySelector("#btn");
function reloadWindow() {chrome.tabs.getSelected(null, function(tab) {chrome.tabs.reload(tab.id);});}
chrome.storage.local.get("togle", function(items){
    x.dataset.togle = items.togle;
    if(items.togle == "false"){x.innerHTML = "OFF";}
    x.addEventListener("click", () => {
        if(x.dataset.togle == "false"){
            x.innerHTML = "ON";
            x.dataset.togle = "true";
            chrome.storage.local.set({ "togle": "true" });
            reloadWindow();
        }
        else{
            x.innerHTML = "OFF";
            x.dataset.togle = "false";
            chrome.storage.local.set({ "togle": "false"}); 
            reloadWindow();
        }
    });
});


