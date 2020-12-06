/**
 * Created by cc on 2020/12/6.
 */
"use strict";
let branch = extractBranch();
let url = document.documentURI;
let demoboxLink;
let demoboxDate;

function extractBranch() {
    let elem = document.querySelector('#partial-discussion-header > div.d-flex.flex-items-center.flex-wrap.mt-0.gh-header-meta > div.flex-auto.min-width-0.mb-2 > span.commit-ref.css-truncate.user-select-contain.expandable.head-ref > a > span');
    return elem.innerText;
}

function setDemoboxLink(url) {
    demoboxLink = `https:${url}/app/agent-search`;
}

function extractDemobox() {
    for (const comment of document.querySelectorAll('.timeline-comment')) {
        for (const h2 of comment.querySelectorAll('h2')) {
            if (h2.innerText === 'Demobox Link') {
                let url = h2.parentElement.querySelector('p').innerText;
                setDemoboxLink(url);
                let date = new Date(comment.querySelector('relative-time').getAttribute('datetime'));
                demoboxDate = date;
            }
        }
    }
}

extractDemobox();
chrome.runtime.sendMessage({branch, url, demoboxLink, demoboxDate});
