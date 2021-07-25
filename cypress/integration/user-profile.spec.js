describe('User Profile', () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/login");

      cy.get('#username').type('suztest240721').should('have.value', 'suztest240721')
      cy.get('#password')
      .type('password')
      .should('have.value', 'password')
      .should('have.attr', 'type', 'password');

      cy.contains('Login').click()
      cy.intercept("GET", "/recipes", {
          statusCode: 200,
      });
      cy.get("Button").contains("LOGIN").click();
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

        cy.intercept("GET", "/recipes", {
            statusCode: 200,
        });
        cy.get("Button").contains("LOGIN").click();
        cy.get("a").contains("User Profile").click();
        cy.get("h1").should("contain", "USER PROFILE");
        cy.get("th").should("contain", "USERNAME");

        // cy.url().should("include", "/");
        // cy.get("h1").should("contain", "RECIPES");
        // cy.get("a").should("contain", "HOME");
        // cy.get("h4").should("contain", "LUNCH");
    });

  //   it('successfully loads', () => {
  //     cy.get("a").contains("HOME").click();
  //     // cy.visit('http://localhost:8080/');
  //     // cy.url().should("include", "/");
  //     cy.get("h1").should("contain", "RECIPES");
  //   })
})