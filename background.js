class PullRequest {
    branch;
    user;
    jira;
    description;

    constructor(branch) {
        this.branch = branch;
        const [p1, p2] = branch.split('/');
        this.user = p1.replaceAll('.', '');
        const jiraPart = p2.split('-');
        this.jira = jiraPart.slice(0, 2).join('-');
        this.description = jiraPart.slice(2).join('-');
    }

    formatDate() {
        const today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let hh = today.getHours();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        if (hh < 10) {
            hh = '0' + hh;
        }
        return `${mm}${dd}h${hh}`;
    }

    get pipelineName() {
        return `${this.formatDate()}-${this.user}-${this.jira}`.toLowerCase();
    }

    get applicationName() {
        const branch = this.branch.toLowerCase();
        const config = {
            'mlsti': 'search-mls-filters-modal',
            'star': 'search-mls-filters-modal',
        };
        return Object.entries(config).filter(([keyword, _]) => branch.includes(keyword + '-')).map(t => t[1]) || 'unknown';
    }
}

let pr;

function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to.
    var copyFrom = document.createElement("textarea");

    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;

    //Append the textbox field into the body as a child.
    //"execCommand()" only works when there exists selected text, and the text is inside
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);

    //Select all the text!
    copyFrom.select();

    //Execute command
    document.execCommand('copy');

    //(Optional) De-select the text using blur().
    copyFrom.blur();

    //Remove the textbox field from the document.body, so no other JavaScript nor
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
}

function clearAndCopyTextToClipboard(text) {
    clearPastBoard();
    copyTextToClipboard(text);
}

function clearPastBoard() {
    copyTextToClipboard('');
}

function copyBranch() {
    clearAndCopyTextToClipboard(pr.branch);
}


function copyPipelineName() {
    clearAndCopyTextToClipboard(pr.pipelineName);
}



let createMenus = function () {
    chrome.contextMenus.create({
        "title": "Copy branch",
        "onclick": copyBranch,
        "documentUrlPatterns": ['https://*.github.com/UrbanCompass/uc-frontend/pull/*']
    });
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
};

createMenus();

function copyApplicationName() {
    clearAndCopyTextToClipboard(pr.applicationName);
}

chrome.runtime.onMessage.addListener(function (message) {
    pr = new PullRequest(message.branch);

    // let isValid = pr && message.url && message.url.includes('github.com/UrbanCompass/uc-frontend/pull');
});
