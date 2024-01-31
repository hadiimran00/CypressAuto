describe('Organizations Tab', () => {

    before('Logging In', () => {
            cy.session('customer sessions', () => {
            cy.visit('/');
            cy.fixture('login').then((loginData) => {
                cy.get('#email-address-input').type(loginData.email);
                cy.get('#password-input').type(loginData.password);
                cy.get('#login-button').click();
                cy.wait(10000);
           });
        });
    });

    before('Visit', () => {
        cy.visit('/');
        cy.get('.custom-menu', { timeout: 40000 }).contains('Organizations').click();
    });

    it('Adding Organization', () => {
        
    cy.get('[name="fullName"]').type('Test Organization');
    cy.get('[class="ant-select-selector"]').contains('Workshop').click();
    cy.get('[name="contact"]').type('3000000000');
    cy.get('[name="password"]').type('qwerty');
    cy.get('[name="confirmPassword"]').type('qwerty');
    cy.get('[name="address"]').type('Test Address');
    cy.get('[class="ant-select-selection-search"]').eq(1).click({ force: true });
    cy.get('[class="rc-virtual-list"]').contains('Karachi').click();
    cy.get('[name="latitude"]').type('1');
    cy.get('[name="longitude"]').type('1');
    cy.get('[name="cnic"]').type('00000000000000');
    cy.get('[name="ntn"]').type('00000000000000');
    // cy.get('[class="ant-select-selection-item"]').eqclick()


    function AddTime(eq) {

        cy.get('[role="combobox"]').eq(eq).click({ force: true });
        // cy.get('.ant-select-item-option-content').contains('09 AM', { timeout: 10000 })
        cy.get('[class="rc-virtual-list"]').contains('09 AM', { timeout: 10000 })

            //.scrollIntoView()
            .should('be.visible')
            .click({ force: true });

            //vscode

    }
    //function sirf aik bar chalra
    AddTime(3);
    AddTime(5);
    AddTime(7);
    AddTime(9);
    AddTime(11);
    AddTime(13);
    AddTime(15);
    });

    it('Searching for Organization', () => {
        cy.get('[role="button"]').eq('1').click();
        cy.get('[placeholder="Search fullName"]').type('Test Workshop');
        cy.get('[type="button"]').contains('Search').click();
        cy.get('[class="ant-table-tbody"]').contains(/^Test Workshop$/i, { timeout: 10000 }).should('have.text', 'Test Workshop');
    });

    it('Updating Organization', () => {
        cy.get('[role="button"]').eq('1').click();
        cy.get('[placeholder="Search fullName"]').type('Test Workshop');
        cy.get('[type="button"]').contains('Search').click();
        cy.get('[class="ant-table-tbody"]').contains(/^Test Workshop$/i, { timeout: 10000 }).should('have.text', 'Test Workshop')
            .click();
        cy.get('[name="fullName"]', { timeout: 10000 }).clear().type('Test Organization');
        cy.get('[type="button"]').contains('Update').click();
    });

});


