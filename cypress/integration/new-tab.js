// basic-test.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Create tabs page', () => {
    it('should check values and create a new tab', () => {
      
      cy.visit('http://localhost:3000/tab-creation/new')
      cy.get('[data-cy=headline]').should('have.text' ,'Create a new tab')

      const songNameInput = cy.get('[data-cy=songNameInput]')
      songNameInput.should('have.not.value','song')
      songNameInput.should('have.attr', 'placeholder', 'Song name')
      songNameInput.type('song')
      songNameInput.should('have.value', 'song')

      const timeSignature = cy.get('[data-cy=timeSignatureSelect]')
      timeSignature.select('4/4').should('have.value', '4/4')

      const newButton = cy.get('[data-cy=addNewTabButton]')
      newButton.should('be.visible')
      
      cy.get('[data-cy=duoline0]').should('not.exist')
      cy.get('[data-cy=addNewTabButton]').click()
      cy.get('[data-cy=duoline0]').should('exist')

      cy.get('[data-cy=duoline1]').should('not.exist')
      cy.get('[data-cy=addNewTabButton]').click()
      cy.get('[data-cy=duoline1]').should('exist')


    })
  })
