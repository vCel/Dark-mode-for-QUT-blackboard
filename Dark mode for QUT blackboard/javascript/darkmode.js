var head = document.documentElement || document.head || document.querySelector("head");
console.log('QUT URL FOUND');
init();

if (document.readyState != 'loading') {
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        if ("mode_enabled" in changes) {
            if (changes.mode_enabled.newValue === 'true') {
                applyCSS('dark');
            }
            else {
                removeCSS();
            }
        }
    });
} 
else {
    document.addEventListener('DOMContentLoaded', function() {
        chrome.storage.onChanged.addListener(function (changes, namespace) {
            if ("mode_enabled" in changes) {
                if (changes.mode_enabled.newValue === 'true') {
                    applyCSS('dark');
                }
                else {
                    removeCSS();
                }
            }
        });
    });
}

function init() {
    chrome.storage.local.get('mode_enabled', (result) => {
        if (result.mode_enabled === undefined) {
            setMode('true');
        }
        if (result.mode_enabled === 'true') {
            applyCSS('dark');
        }
    });
}

function setMode(data) {
    chrome.storage.local.set({'mode_enabled': data}, function() {
        console.log('Dark mode is set to ' + data);
    });
}
function applyCSS(colour) {
    var link = document.createElement("link"),
        href = chrome.runtime.getURL('css/styling_'+ colour + '.css');
    link.setAttribute("type", "text/css");
    link.setAttribute("id", 'qut-css');
    link.setAttribute("class", 'dmn-custom-append-data');
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", href);

    if (head) {
        head.appendChild(link);
    }
}

function removeCSS() {
    var link = document.getElementById("qut-css");

    if (head) {
        head.removeChild(link);
    }
    console.log(link);
}


