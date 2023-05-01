const variables = {
    leavesTab: 'div[class="lp-nav-menu__title"]',
    leavesLbl: 'Leaves  ',
    subLinks: 'div[class="lp-nav-menu__link__sub-links__group"]',
    approvalsLbl: 'Approvals',
    reviewerHeader: 'div[id="reviewer-header"]',
    dashboard: 'div[class="lp-dashboard lp-dashboard--open"]',
    tableBody: 'tbody[id="tableBody-leave-table"]'
};

export class ApprovalsPage {

    static open = () => {

        cy.get(variables.dashboard,{timeout: 4000})

        cy.get(variables.leavesTab).eq(2).click();

        cy.get(variables.subLinks).contains(variables.approvalsLbl).click();

        cy.get(variables.reviewerHeader, { timeout: 5000 });

    };

    static getVariables() {
        return variables
    };

    static getTableList() {
        return cy.get(variables.tableBody)
    }

};