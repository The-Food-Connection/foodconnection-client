context('App', () => {
  it('should load our app and show content', () => {
    cy.visit('http://localhost:8080')
    // cy.contains('Please Enter Your Details Below to Sign Up')
    cy.get("Button").contains("SIGNUP").click();
  })

  it('successfully loads', () => {
    cy.visit('http://localhost:8080/sign-up')
  })
})

