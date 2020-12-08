/**
 * Created by cc on 2020/12/6.
 */
"use strict";
chrome.runtime.onMessage.addListener(function (message) {
    const {type, url} = message;
    if (type === 'pipeline') {
        const {branch} = message;
        store[url] = {pr: new PullRequest(branch)};
    } else if (type === 'demoBox') {
        const {demoboxLink} = message;
        if (demoboxLink) {
            clearAndCopyTextToClipboard(demoboxLink);
        }
    }
});
