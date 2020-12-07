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
    demoboxLink = `https://${url}/app/agent-search`;
}

function extractDemobox() {
    for (const comment of document.querySelectorAll('.timeline-comment')) {
        for (const h2 of Array.from(comment.querySelectorAll('h2')).reverse()) {
            if (h2.innerText === 'Demobox Link') {
                setDemoboxLink(h2.parentElement.querySelector('p').innerText);
                let dropDownTime = comment.querySelector('.lh-condensed relative-time');
                if (dropDownTime) {
                    demoboxDate = dropDownTime.innerText;
                } else {
                    demoboxDate = comment.querySelector('relative-time').innerText;
                }
            }
        }
    }
}

chrome.runtime.sendMessage({branch, url, type: 'pipeline'});

chrome.runtime.onMessage.addListener(function (message) {
    switch (message.type) {
        case 'alert':
            alert(message.msg);
        case 'getDemoBox':
            extractDemobox();
            chrome.runtime.sendMessage({demoboxLink, demoboxDate, type: 'demoBox'});
            if (!demoboxLink || !demoboxDate) {
                alert('DemoBox not loaded!');
            } else {
                alert(`Copy success! 
DemoBox generated time: ${demoboxDate} `);
            }
    }
});
