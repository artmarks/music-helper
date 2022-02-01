// basic-test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Link Navigation', () => {
    it('should navigate through the page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Music Helper');
  
      cy.visit('http://localhost:3000/tab-creation')
      cy.get('[data-cy=headline]').should('have.text','Tab creation')

      cy.visit('http://localhost:3000/tab-creation/new')
      cy.get('[data-cy=headline]').should('have.text' ,'Create a new tab')

    })
  })

  describe('Click Navigation', () => {
    it('should navigate through the page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
      cy.get('h1').contains('Music Helper');
      
      cy.get('[data-cy=linkToTabCreation]').click()
      cy.get('[data-cy=headline]').should('have.text','Tab creation')

      cy.get('[data-cy=linkToNew]').click()
      cy.get('[data-cy=headline]').should('have.text' ,'Create a new tab')

    })
  })