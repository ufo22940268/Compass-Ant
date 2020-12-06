/**
 * Created by cc on 2020/12/6.
 */
"use strict";

function extractBranch() {
    let elem = document.querySelector('#partial-discussion-header > div.d-flex.flex-items-center.flex-wrap.mt-0.gh-header-meta > div.flex-auto.min-width-0.mb-2 > span.commit-ref.css-truncate.user-select-contain.expandable.head-ref > a > span');
    return elem.innerText;
}

let branch = extractBranch();
chrome.runtime.sendMessage({branch});
