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
    chrome.contextMenus.create({
        title: 'Copy demoBox',
        "onclick": copyDemoBox,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*']
    });
};

createMenus();

chrome.runtime.onMessage.addListener(function (message) {
    for (const [url, content] of Object.entries(message)) {
        const pr = new PullRequest(content.branch);
        const demoBox = new DemoBox(content.demoboxLink, content.demoboxDate);
        store[url] = {pr, demoBox};
    }
});
