const { BasePage } = require("../../Pages/BasePage");
const { MyLeavesPage } = require("../../Pages/Leaves/MyLeavesPage");

describe('2. Leave request creating and editing test', () => {

    before(() => {
        const currentDate = new Date().toLocaleString()
        cy.log(`Starting tests at ${currentDate}`);
        console.log(`Starting tests at ${currentDate}`);

        cy.fixture('user').then(user => {
            // BasePage.apiLogin(user.employee.email, user.employee.password)

            BasePage.manualLogin(user.employee.email, user.employee.password)
        })
            .then(() => {

                MyLeavesPage.open()

            });

    });

    describe('2.1 Verifying messages tab', () => {

        it('2.1.1 Should open Request new leave dialog', () => {

            MyLeavesPage.clickNewLeaveButton()

            BasePage.getDialog()
                .should('exist')
                .should('be.visible')

        })

        it('2.1.2 Should verify Annual leave field', () => {

            BasePage.getDialog().within(() => {

                MyLeavesPage.getLeaveTypeDD()
                    .should('exist')

                MyLeavesPage.verifyLeaveTypeDD()

            })
        })

        it('2.1.3 Should verify Notes field', () => {

            MyLeavesPage.verifyNotesField()

        })

        it('2.1.4 Should verify Requested leave time is empty', () => {

            BasePage.getDialog().within(() => {
                MyLeavesPage.getRequestedLeaveTime('-')
            })
        })

        it('2.1.5 Should select dates at the current year', () => {

            BasePage.getDialog().within(() => {
                MyLeavesPage.selectDates('21', '24')
            })
        })

        it('2.1.6 Should verify message is displayed', () => {

            MyLeavesPage.verifyRedAlert()

        })

        it('2.1.7 Should verify cancel dialog button', () => {

            MyLeavesPage.getCancelButton()
                .click()

            BasePage.getDialog()
                .should('not.exist')
        })

        it('2.1.8 Should verify close dialog button', () => {

            MyLeavesPage.clickNewLeaveButton()

            MyLeavesPage.getCloseButton()
                .click()

            BasePage.getDialog()
                .should('not.exist')
        })

    });

    describe('2. 2 Verifying leave is added and displaying', () => {
        it('2.2.1 Should manualy add new leave request', () => {

            MyLeavesPage.clickNewLeaveButton()

            MyLeavesPage.goToNovember2022()

            BasePage.getDialog().within(() => {
                MyLeavesPage.selectDates('21', '24')

                MyLeavesPage.getRequestedLeaveTime('4 d')
            })

            MyLeavesPage.typeNotesField('test')

            MyLeavesPage.clickSaveAsDraftBtn()

        })

        it('2.2.2 Should verify row type', () => {

            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .should('contain', 'Annual leave')

        })

        it('2.2.3 Should verify status', () => {
            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .should('contain', 'Draft')
        })

        it('2.2.3 Should verify dates', () => {
            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .should('contain', 'Nov 21 → 24, 2022')
        })

        it('2.2.3 Should verify amount', () => {
            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .should('contain', '4 d')
        })

    })

    describe('2.3 Verifying deleting row', () => {
        it('2.3.1 Should open Request new leave dialog', () => {

            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .click()

        })

        it('2.3.2 Should click delete button', () => {

            MyLeavesPage.clickdeleteDraftBtn()

        })

        it('2.3.3 Should verify click Cancel', () => {

            MyLeavesPage.clickConfirmCancelBtn()
        })

        it('2.3.4 Should verify request is still displaying', () => {

            MyLeavesPage.getAnnualLeaveByDate(' Nov 21 → 24, 2022')
                .should('be.visible')

        })

        it('2.3.5 Should click delete and confirm', () => {

            MyLeavesPage.clickdeleteDraftBtn()

            MyLeavesPage.clickConfirmDeleteBtn()

        })

        it('2.3.6 Should verify row is not displayed', () => {

            MyLeavesPage.getMyRequests()
            .should('not.contain', 'Nov 21 → 24, 2022')
        })
    })

    after(() => {
        const currentDate = new Date().toLocaleString()
        cy.log(`Tests finished at ${currentDate}`);
        console.log(`Tests finished at ${currentDate}`);
    })

})