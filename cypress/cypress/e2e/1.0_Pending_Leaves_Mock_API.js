const { BasePage } = require("../../Pages/BasePage");
const { ApprovalsPage } = require("../../Pages/Leaves/ApprovalsPage");

describe('1. Mocking API Pending leaves displaying test', () => {

    before(() => {
        const currentDate = new Date().toLocaleString()
        cy.log(`Starting tests at ${currentDate}`);
        console.log(`Starting tests at ${currentDate}`);

        cy.fixture('user').then(user => {
            //    BasePage.apiLogin(user.manager.username, user.manager.password)

            BasePage.manualLogin(user.manager.email, user.manager.password)
        })
            .then(() => {

                cy.intercept(Cypress.env("apiUrl") + 'reviewers/62783/requests/leave', { fixture: 'newleave' })

            });

    });

    describe('1.1 Verifying pending leaves displaying', () => {

        it('1.1.1 Should open approvals page', () => {

            ApprovalsPage.open()

        })
        it('1.1.2 Should verify table contains ids', () => {

            cy.fixture('newleave').then(newleave => {

                ApprovalsPage.getTableList()
                    .should('contain', newleave.data.content[0].requestId)
                    .should('contain', newleave.data.content[1].requestId)

            })
        })

        it('1.1.3 Should verify table contains names', () => {

            cy.fixture('newleave').then(newleave => {

                ApprovalsPage.getTableList()
                    .should('contain', newleave.data.content[0].employee.firstName + ' ' + newleave.data.content[0].employee.lastName)
                    .should('contain', newleave.data.content[1].employee.firstName + ' ' + newleave.data.content[1].employee.lastName)

            })
        })

        it('1.1.4 Should verify table contains leave type', () => {

            cy.fixture('newleave').then(newleave => {

                ApprovalsPage.getTableList()
                    .should('contain', newleave.data.content[0].requestTypeName)
                    .should('contain', newleave.data.content[1].requestTypeName)

            })
        })

        it('1.1.5 Should verify table contains leave dates', () => {

            cy.fixture('newleave').then(newleave => {

                ApprovalsPage.getTableList()
                    .should('contain', newleave.data.content[0].amount)
                    .should('contain', newleave.data.content[1].amount)

            })
        })

        it('1.1.6 Should verify table contains statuses', () => {

            cy.fixture('newleave').then(newleave => {

                let status = newleave.data.content[0].requestStatus
                ApprovalsPage.getTableList()
                    .should('contain', status.charAt(0).toUpperCase() + status.slice(1))


            })
        })

    })

    after(() => {
        const currentDate = new Date().toLocaleString()
        cy.log(`Tests finished at ${currentDate}`);
        console.log(`Tests finished at ${currentDate}`);
    })
})