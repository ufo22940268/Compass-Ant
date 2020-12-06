class PullRequest {
    branch;
    user;
    jira;
    description;

    constructor(branch) {
        this.branch = branch;
        const [p1, p2] = branch.split('/');
        this.user = p1;
        const jiraPart = p2.split('-');
        this.jira = jiraPart.slice(0, 2).join('-');
        this.description = jiraPart.slice(2).join('-');
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

function copyBranch() {
    copyTextToClipboard(pr.branch);
}

chrome.contextMenus.create({
    "title": "Copy branch",
    "onclick": copyBranch
});

chrome.runtime.onMessage.addListener(function (message) {
    pr = new PullRequest(message.branch);
});
