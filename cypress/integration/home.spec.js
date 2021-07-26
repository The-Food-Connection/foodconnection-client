// arrange act assert

describe('The Home Page', () => {
    beforeEach(() => {
      cy.visit("http://localhost:8080/login");
      cy.clearLocalStorage("The Home Page");

      cy.get('#username').type('#username').should('have.value', 'suztest2007')
      cy.get('#password')
      .type('password')
      .should('have.value', '123456')
      .should('have.attr', 'type', 'password');

      cy.contains('Login').click()
      cy.intercept("GET", "/recipes", {
          statusCode: 200,
      })
      cy.get("Button").contains("LOGIN").click();
    })

    it('successfully loads', () => {
      cy.visit('http://localhost:8080')
    })
  
    it('Login with correct credentials', () => {

        cy.intercept("POST", "/login", {
            statusCode: 200,
            body: {
              username: "name",
              email: "test@test.com",
              token: "1",
            },
        })

        cy.intercept("GET", "/recipes", {
            statusCode: 200,
        });
        cy.get("Button").contains("LOGIN").click();

        cy.url().should("include", "/");
        cy.get("h1").should("contain", "RECIPES");
        cy.get("a").should("contain", "HOME");
        cy.get("h4").should("contain", "LUNCH");
    });

  //   it('successfully loads', () => {
  //     cy.get("a").contains("HOME").click();
  //     // cy.visit('http://localhost:8080/');
  //     // cy.url().should("include", "/");
  //     cy.get("h1").should("contain", "RECIPES");
  //   })
})
