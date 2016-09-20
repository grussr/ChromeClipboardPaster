chrome.browserAction.onClicked.addListener(function(tab) {
    var clipboardValue = getClipboard();
	chrome.tabs.sendMessage(tab.id, {
            text: 'setText',
            value: clipboardValue },
        getDomCallBack);
});

function getClipboard() {
    var result = null;
    var textarea = document.getElementById('clipboardholder');
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

function getDomCallBack(content)
{
}