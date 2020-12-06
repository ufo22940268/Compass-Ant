/**
 * Created by cc on 2020/12/6.
 */
"use strict";
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
