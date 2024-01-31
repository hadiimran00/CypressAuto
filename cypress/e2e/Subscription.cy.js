describe('Subscription',()=>{

    beforeEach('Logging In',()=>{
        cy.login();
    })
    it('Subscribing', () => {
        cy.visit('/')
        cy.intercept('https://api.autocore.io/api/organizations/get/franchise').as('Org')

        cy.get('a.ant-menu-item-icon[href="/settings"]').click();

        cy.wait('@org').then(('interception')=>{
            
        })
    });

})