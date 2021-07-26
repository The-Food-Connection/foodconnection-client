context('App', () => {
  it('should load our app and show content', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Please Enter Login Details Below')
  });
})
