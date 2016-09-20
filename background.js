chrome.browserAction.onClicked.addListener(function (tab) {
    var clipboardValue = getClipboard();
    if (clipboardValue != null) {
        chrome.tabs.sendMessage(tab.id, {
            text: 'setText',
            value: clipboardValue
        },
            getDomCallBack);
    }
    else {
        console.error('could not get clipboard text!');
    }
});

function getClipboard() {
    var result = null;
    var textarea = document.getElementById('clipboardholder');
    if (typeof textarea === undefined) {
        console.log('textarea is missing!');
        return null;
    }
    textarea.value = '';
    textarea.select();

    if (document.execCommand('paste')) {
        result = textarea.value;
    } else {
        console.error('failed to get clipboard content');
    }

    textarea.value = '';
    return result;
}

function getDomCallBack(content) {
}