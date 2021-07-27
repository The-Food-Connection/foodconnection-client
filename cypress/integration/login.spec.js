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

        // cy.intercept("POST", "/login", {
        //     statusCode: 200,
        //     body: {
        //       username: "name",
        //       email: "test@test.com",
        //       token: "1",
        //     },
        // });

        // cy.intercept("GET", "/recipes", {
        //     statusCode: 200,
        // });
        cy.get("Button").contains("LOGIN").click();
    
        cy.url().should("include", "/");
        cy.get("h2").should("contain", "Please Enter Login Details Below");
        cy.get("a").should("contain", "HOME");
    });

    it("should show an error when logged in with wrong credentials", () => {
        // cy.intercept("POST", "/login", {
        //   statusCode: 400,
        //   body: {
        //     error: "Invalid username or password",
        //   },
        // });
        cy.get("Button").contains("LOGIN").click();
        // cy.get("div").should("contain", "Invalid username or password");
      });



});

