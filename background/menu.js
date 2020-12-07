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

function requestDemoBox({pageUrl}) {
    clearPastBoard();
    if (!store[pageUrl]) {
        alertInPage('DemoBox not loaded!');
    } else {
        let demoBox = store[pageUrl].demoBox;
        clearAndCopyTextToClipboard(demoBox.link);
        alertInPage(`Copy success! 
DemoBox generated time: ${demoBox.date} `);
    }
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
        title: `Copy demoBox`,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*'],
        "onclick": requestDemoBox,
    });
};

createMenus();

