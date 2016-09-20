chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    var responseText = "";
    var activeElement = document.activeElement;
    if ((typeof activeElement === undefined) ||
        (activeElement === null)) {
        sendResponse('No element selected');
    }

    if (msg.text && (msg.text == "setText")) {
        if (activeElement.tagName === 'INPUT') {
            activeElement.value = msg.value;
            responseText = "changed input";
        }
        else if (activeElement.tagName === 'TEXTAREA') {
            activeElement.innerText = msg.value;
            responseText = "changed textarea";
        }
        else {
            responseText = "unknown input type " + activeElement.tagName;
        }
    }
    else {
        responseText = "Unknown message";
    }
    sendResponse(responseText);
});