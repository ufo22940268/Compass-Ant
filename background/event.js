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
});

