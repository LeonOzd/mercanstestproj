const variables = {
    button: '',
    divNewLeaveButton: 'div[class="my-leaves__mobile-new"]',
    leaveTypeDD: 'div[id="employee-name"]',
    disabled: 'disabled',
    leavyTypeLbl: 'Annual leave',
    notesTxtField: 'textarea[id="notes"]',
    notesPlaceHolder: 'Write your note',
    requestedLeaveTime: 'span[class="custom-badge"]',
    calenderWrapper: 'div.calendar__wrapper',
    redAlert: 'div.red-alert',
    redAlertMsg: 'Cannot make a request into upcoming balance period. You can only make requests where start and end date are between January 01, 2022 and December 31, 2022.',
    closeButton: 'button[class="button-close m-modal__close"]',
    cancelButton: 'button[class="button-action button-action__fat button-action--cancel"]',
    saveAsDraftBtn: 'button[class="button-action button-action__fat button-action--add"]',
    myRequestSection: 'div[class="my-requests-block__wrapper"]',
    deleteDraftBtn: 'div[id="delete-draft"]',
    confirmCancelBtn: 'button[class="button-action button-action__fat button-action--cancel bordered-cancel"]',
    confirmDeleteBtn: 'button[class="button-action button-action__fat button-action--delete"]',
    calenderMonthAndYear: 'div.calendar__header-nav > div:nth-child(2)',
    calenderPreviousBtn: 'div[class="arrow-hover__wrapper left"]'

};

export class MyLeavesPage {

    static url = Cypress.config('baseUrl') + 'ess/leaves/720/employee/my-leaves';

    static open = () => {

        cy.visit(this.url,
            {
                timeout: 10000, onLoad() {

                    console.log("My leaves tab is loaded")
                }
            });
    };

    static getVariables() {
        return variables
    };

    static clickNewLeaveButton() {
        return cy.get(variables.divNewLeaveButton).find('button').click()
    };

    static getLeaveTypeDD() {
        return cy.get(variables.leaveTypeDD)
    };

    static verifyLeaveTypeDD() {
        this.getLeaveTypeDD()
            .should('have.class', variables.disabled)
            .should('contain', variables.leavyTypeLbl)
    };

    static verifyNotesField() {
        return cy.get(variables.notesTxtField)
            .invoke('attr', 'placeholder')
            .should('eq', variables.notesPlaceHolder)
    };

    static typeNotesField(text) {
        return cy.get(variables.notesTxtField)
            .clear()
            .type(text)
    };

    static getRequestedLeaveTime(textValue) {
        return cy.get(variables.requestedLeaveTime)
            .should('have.text', textValue)
    };

    static selectDates(startDay, endDay) {
        cy.get(variables.calenderWrapper)
            .contains(startDay)
            .click()


        cy.get(variables.calenderWrapper)
            .contains(endDay)
            .click()

    };

    static verifyRedAlert() {
        return cy.get(variables.redAlert)
            .should('contain', variables.redAlertMsg)

    };

    static getCloseButton() {
        return cy.get(variables.closeButton)
    };

    static getCancelButton() {
        return cy.get(variables.cancelButton)
    };

    static goToNovember2022() {

        const expectedMonthAndYear = 'November 2022';
        cy.get(variables.calenderMonthAndYear).invoke('text').then((text) => {
            if (text !== expectedMonthAndYear) {
                cy.get(variables.calenderPreviousBtn).click().then(() => {
                    this.goToNovember2022()
                })
            };
        });
    };

    static clickSaveAsDraftBtn() {
        return cy.get(variables.saveAsDraftBtn).click()
    };

    static getAnnualLeaveByDate(date) {
        return cy.get(variables.myRequestSection).contains(date).parents('div[class="tile-wrapper"]')
    };

    static clickdeleteDraftBtn() {
        return cy.get(variables.deleteDraftBtn).click()
    };

    static clickConfirmCancelBtn() {
        return cy.get(variables.confirmCancelBtn).click()
    };

    static clickConfirmDeleteBtn() {
        return cy.get(variables.confirmDeleteBtn).click()
    };

    static getMyRequests() {
        return cy.get(variables.myRequestSection)
    };
}
