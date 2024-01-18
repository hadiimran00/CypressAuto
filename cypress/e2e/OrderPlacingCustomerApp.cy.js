describe('Order Placing Journey', () => {
    it('should allow users to place an order successfully', () => {
      // Login to the website.
      cy.visit('https://customertest.okayker.com/');
      cy.get('[class="MuiTypography-root MuiTypography-body1 css-1muuqk3"]').eq(2).click();
      //cy.visit('https://customertest.okayker.com/login/');
      cy.get('[id=":r2:"]').type('3152705967');
      cy.get('[data-testid="SendIcon"]').click();
      cy.wait(5000);
      cy.get('[type="number"]').should('exist').then(() => {
        cy.get('[id=":r4:"]').click();

      });

      
      
    


     
    });
  });