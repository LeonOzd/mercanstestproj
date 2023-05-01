const variables = {

    emailField: 'input[name="email"]',
    passwordField: 'input[name="password"]',
    loginButton: 'button[class="button-action button-action__fat button-action--save"]',
    menubar: 'div[class="lp-nav-menu"]',
    dialog: 'div.modal-dialog'
};

export class BasePage {

    static getVariables() {
        return variables
    };

    static manualLogin(email, password) {

        cy.visit(Cypress.config('baseUrl') + '/login',
            {
                timeout: 10000, onLoad() {

                    console.log("Login page is loaded")
                }
            });

        cy.get(variables.emailField).type(email, { delay: 200 });
        cy.get(variables.passwordField).type(password, { delay: 200 });
        cy.get(variables.loginButton).click()
        cy.get(variables.menubar, { timeout: 5000 })
    }

    static apiLogin(email, password) {
        cy.request({
            method: 'POST',
            url: 'https://ssoapi-acceptance.mgthost.com/login/credential',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Content-Type': 'application/json',
            },
            body: {
                loginPassword: email,
                loginUsername: password
            },
        })
            .then((body) => {
                console.log('Log-in status: ' + body.statusText);
                expect(body).to.have.property('status').to.eq(200);
            })
    }

    static getDialog() {
        return cy.get(variables.dialog, { timeout: 3000 })

    }
}