// arrange act assert

describe('Login', () => {
    beforeEach(() => {
        cy.visit("http://localhost:8080/login");

        cy.get('#username').type('suztest2007').should('have.value', 'suztest2007')
        cy.get('#password')
        .type('123456')
        .should('have.value', '123456')
        .should('have.attr', 'type', 'password');

        cy.contains('Login').click()
    })

    it('Login with correct credentials', () => {

        cy.intercept("POST", "/login", {
            statusCode: 200,
            body: {
              username: "name",
              email: "test@test.com",
              token: "1",
            },
        });

    })
})