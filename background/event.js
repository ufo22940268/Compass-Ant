/**
 * Created by cc on 2020/12/6.
 */
"use strict";
let currentTab;
chrome.runtime.onMessage.addListener(function (message) {
    const {url, branch, demoboxLink, demoboxDate} = message;
    const pr = new PullRequest(branch);
    const demoBox = new DemoBox(demoboxLink, demoboxDate);
    store[url] = {pr, demoBox};

    if (url === currentTab.url) {
        updateDemoBox(demoBox);
    }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        currentTab = tab;
        updateDemoBox(store[tab.url].demoBox);
    });
});

// chrome.tabs.query({active: true}, (tabs) => {
//     const {demoBox} = store[tabs[0].url];
//     updateDemoBox(demoBox);
// });
