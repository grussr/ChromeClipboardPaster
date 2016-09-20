var logging = false;

chrome.browserAction.onClicked.addListener(function (tab) {
    writeLog("injecting javascript");
    chrome.tabs.executeScript(null, {
        file: "content-script.js",
        allFrames: true
    });
    writeLog("getting clipbaord value");
    var clipboardValue = getClipboard();
    if (clipboardValue != null) {
        writeLog("got clipboard value, sending message to client js");
        chrome.tabs.sendMessage(tab.id, {
            text: "setText",
            value: clipboardValue
        },
            getDomCallBack);
    }
    else {
        writeLog("could not get clipboard text!");
    }
});

function getClipboard() {
    var result = null;
    var textarea = document.getElementById("clipboardholder");
    if (typeof textarea === undefined) {
        writeLog("textarea is missing!");
        return null;
    }
    textarea.value = "";
    textarea.select();

    if (document.execCommand("paste")) {
        result = textarea.value;
        writeLog("got value " + result)
    } else {
        writeLog("failed to get clipboard content");
    }

    //textarea.value = "";
    return result;
}

function getDomCallBack(content) {
    writeLog("response from on page js: " + content);
}

function writeLog(text) {
    if (!logging) {
        return;
    }
    console.log(text);
}