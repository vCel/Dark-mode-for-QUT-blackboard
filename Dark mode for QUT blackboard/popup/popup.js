document.getElementById('mode').addEventListener('click', enableDark);

chrome.storage.local.get('mode_enabled', (result) => {
    if (result.mode_enabled == 'false') {
        document.getElementById('mode').checked = false;
    }
});

function enableDark() {
    var mode = document.getElementById('mode');
    var data = mode.checked.toString();

    chrome.storage.local.set({'mode_enabled': data}, function() {
        console.log('Dark mode is set to ' + data);
    });
}
