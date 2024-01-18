
describe('Order Placing Journey', () => {
  it('should allow users to place an order successfully', () => {
    cy.window().then((win) => {
      const style = win.document.createElement('style');
      style.innerHTML = `
        span.ant-select-selection-placeholder {
          pointer-events: auto;
        }
      `;
      win.document.head.appendChild(style);
    });
    // Login to the website.
    cy.visit('https://beta.okayker.com/');
  //  cy.scrollTo('bottom');
    cy.wait(3000);
    cy.get('[type="email"]').type('ibad.ahmed@okayker.com'); // Fill in the correct email
    cy.get('input[type="password"]').type('okaykerpartner234'); // Fill in the password
    cy.get('button[type="button"]').click(); // Click on the login button
    cy.wait(3000);
    cy.url().should('include', '/dashboard'); // Check if the URL redirects to the dashboard
    cy.get('[id="operations"]').click();
    cy.scrollTo('bottom');
    cy.wait(3000);
    cy.get('input[name="contact"]').type('300000');
    cy.get('.operations_list_container__RAxxG').contains('Test Customer').click();
    cy.get('[role="switch"]').click();
    cy.get('[placeholder="Select Variant"]').type('city');
    cy.get('.operations_list_container__RAxxG').contains('GEN').click();
    cy.get('[type="button"]').contains('Past Orders').click();
    cy.get('[aria-label="Close"]').click();
    //cy.get(':nth-child(13) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn-primary').click();
    cy.get('.ant-select-selection-search').eq(1).type('diagnosis').click(); 
    cy.get('.rc-virtual-list').type('Diagnosis{enter}').click();
    //cy.get('.ant-select-selection-search').eq(2).type('spark').click();
    cy.get('.operations_order_form_wrapper__GnRsN').click();
    cy.get('.ant-select-selection-search').eq(2).type('spark').click();
    cy.get('body').click();
    cy.get('.ant-select-selector').eq(2).type('{enter}');
   // cy.get(':nth-child(11) > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
    cy.get('[type="button"]').contains('Create Order').click();
    cy.wait(2000);
    //cy.get('[type="button"]').contains('Services Confirmed').click({force: true});
    //cy.get('[type="button"]').contains('Services Confirmed').click();
    cy.get('[type="button"]').contains('Services Confirmed', { timeout: 1000000 }).should('be.visible').click();
    cy.get('[type="button"]').contains('Parts Rate Confirmed').click();
    cy.get('[class="ant-tag ant-tag-blue css-1vtf12y"]').then(($element) => {
      const text = $element.text();
    cy.log(`Order No to delete: ${text}`); })

    
    
      

  });
});