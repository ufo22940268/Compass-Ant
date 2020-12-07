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
    const contexts = ["page", "selection", "link", "editable", "image", "video",
        "audio"];
    const menuDefaultOptions = {
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*'],
        contexts
    };
    chrome.contextMenus.create({
        "title": "Copy pipeline name",
        "onclick": copyPipelineName,
        ...menuDefaultOptions
    });
    chrome.contextMenus.create({
        "title": "Copy application name",
        "onclick": copyApplicationName,
        ...menuDefaultOptions
    });
    chrome.contextMenus.create({
        "title": "Copy branch",
        "onclick": copyBranch,
        ...menuDefaultOptions
    });

    chrome.contextMenus.create({
        title: `Copy demoBox`,
        "onclick": requestDemoBox,
        ...menuDefaultOptions
    });
};

createMenus();

