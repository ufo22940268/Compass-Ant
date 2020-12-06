let demoBoxesMenuItem;

let store = {};

function clearPastBoard() {
    copyTextToClipboard('');
}

function copyBranch({pageUrl}) {
    clearAndCopyTextToClipboard(store[pageUrl].pr.branch);
}


function copyPipelineName({pageUrl}) {
    clearAndCopyTextToClipboard(store[pageUrl].pr.pipelineName);
}

function copyApplicationName({pageUrl}) {
    clearAndCopyTextToClipboard(store[pageUrl].pr.applicationName);
}

function copyDemoBox({pageUrl}) {
    let demoBox = store[pageUrl].demoBox;
    clearAndCopyTextToClipboard(demoBox.link);
}

let createMenus = function () {
    chrome.contextMenus.create({
        "title": "Copy pipeline name",
        "onclick": copyPipelineName,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*']
    });
    chrome.contextMenus.create({
        "title": "Copy application name",
        "onclick": copyApplicationName,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*']
    });
    chrome.contextMenus.create({
        "title": "Copy branch",
        "onclick": copyBranch,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*']
    });
};

createMenus();

function updateDemoBox(demoBox) {
    if (demoBoxesMenuItem) chrome.contextMenus.remove(demoBoxesMenuItem);
    demoBoxesMenuItem = chrome.contextMenus.create({
        title: `Copy demoBox (${demoBox.date})`,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*'],
        "onclick": copyDemoBox,
    });
}

