describe('Login Page Test', function() {
    beforeEach(function() {
        cy.visit('https://uat.autocore.io');
        cy.scrollTo('bottom'); 
    });

    it('Verify title of page', function()
    {
        cy.visit('https://partner.okayker.com/')
        cy.title().should('eq','Okayker (Partner Portal)')
        cy.wait(2000)
    })

    it('should display the login page', function() {
        cy.contains('Login As Partner'); 
    })

    it('should be able to login with correct email', function() {
        cy.wait(2000);
        cy.get('[type="email"]').type('ibad.ahmed@okayker.com'); // Fill in the correct email
        cy.get('input[type="password"]').type('okaykerpartner234'); // Fill in the password
        cy.get('button[type="button"]').click(); // Click on the login button
        cy.url().should('include', '/dashboard'); // Check if the URL redirects to the dashboard
    });

    it('should show an error for invalid email', function() {
        cy.wait(2000);
        cy.get('[type="email"]').type('test@okayker.com'); // Fill in the correct email
        cy.get('input[type="password"]').type('okaykerpartner234'); // Fill in the password
        cy.get('button[type="button"]').click(); // Click on the login button
        cy.get('[class="ant-alert-message"]').should('be.visible'); //checking alert
    });

    it('should show an error for incorrect password', function() {
        cy.wait(2000);
        cy.get('[type="email"]').type('ibad.ahmed@okayker.com'); // Fill in the correct email
        cy.get('input[type="password"]').type('abc123'); // Fill in the password
        cy.get('button[type="button"]').click(); // Click on the login button
        cy.get('[class="ant-alert-message"]').should('be.visible'); //checking alert
    });
});
