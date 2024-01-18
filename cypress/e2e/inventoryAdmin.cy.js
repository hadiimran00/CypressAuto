describe('Parts Tab', () => {
let cookieValue;
  beforeEach('Logging In', () => {

    cy.fixture('login.json').then((loginData) => {
      cy.session('inventory session', () => {
        cy.visit('/');
        cy.get('[type="text"]').type(loginData.email);
        cy.get('[type="password"]').type(loginData.password);
        cy.get('#login-button').click();
        cy.wait(10000);
        cy.getCookie('your-cookie-name').then((cookie) => {
          if (cookie) {
             const cookieValue = cookie.value;
            cy.clearCookie('your-cookie-name');
            cy.setCookie('your-cookie-name', cookieValue);
            console.log(cookieValue,'aaaaa')
            cy.log(cookieValue)
          } 
        });
      }, {
        cacheAcrossSpecs: false
      });
    });
  
    cy.visit('/');
    // cy.get('.ant-btn').click();
    cy.get('a.ant-menu-item-icon[href="/parts"]', { timeout: 100000 }).click();
   
  });
  


  it('Adding Parts', () => {

    cy.log(cookieValue)

    // cy.intercept({
    //   method: 'GET',
    //   url: '*',
    // }, (req) => {
    //   const token = req.headers.authorization;
    //   console.log('Request Headers:', req.headers);
    //   console.log('Cookies:', req.headers.cookie);

    
    //   // Rest of the intercept logic...
    // });
    

    const fileName = "parts.jpg";

    cy.get('[type="button"]').contains('Add Inventory').click();

    cy.get('[class="ant-select-selection-item"]').eq(0).type('Test');
    cy.get('[class="ant-select-item-option-content"]',{timeout: 50000}).contains('Test Brand').click();
    cy.get('[class="ant-select-selection-item"]').eq(1).type('Lubrication');
    cy.get('[class="ant-select-item-option-content"]',{timeout: 20000}).contains('Lubrication & Hydraulics').click();
    cy.get('[class="ant-select-selection-item"]').eq(2).type('Engine Oil');
    cy.get('[class="ant-select-item-option-content"]',{timeout: 20000}).contains('Engine Oil').click();
    cy.get('[name="partNo"]').type('qwerty-111');
    cy.get('[name="costPrice"]').type('999');
    cy.get('[name="priceMargin"]').type('10');
    cy.get('[name="volume"]').type('4');
    cy.get('input[type="file"]').attachFile(fileName);


    // cy.get('[type="search"]').eq(4).type('Cultus');
    // cy.get('[class="ant-select-item-option-content"]').contains('Cultus').click();

    // cy.get('[name="minYear"]').type('2000');
    // cy.get('[name="maxYear"]').type('2011');

    // cy.get('[class="ant-select-selection-item"]').eq(4).click();
    // cy.get('[class="ant-select-item-option-content"]').contains('Manual').click();

    // cy.get('[class="ant-select-selection-item"]').eq(5).click();
    // cy.get('[class="ant-select-item-option-content"]').contains('Petrol').click();

    // cy.get('[type="button"]').eq(2).click();
    // //cy.get('[class="ant-select-selection-search"]').eq(7).type('Cultus');
    // cy.get('#rc_select_8').type('Cultus');   // cy.get('[class="ant-select-item-option-content"]').contains('Cultus').click();
    // cy.get('[title="Cultus"]').eq(2).click();
    // cy.get('[class="ant-select-selection-search"]');

    // cy.get('[role="combobox"]').eq(8).type('VXL');
    // cy.get('[role="option"]').contains('VX/VXR/VXL').click();

    // cy.get('[name="minYear"]').eq(1).type('2000');
    // cy.get('[name="maxYear"]').eq(1).type('2010');

    // cy.get('[class="ant-select-selection-item"]').eq(8).type('VXL');
    // cy.get('[class="ant-select-item-option-content"]').contains('VXL').click();
  
    cy.get('[type="search"]').eq(3).type('0W-20');
    cy.get('[class="ant-select-item-option-content"]').contains('0W-20');

    cy.get('[type="button"]').contains('Submit').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');


  });

  it(' Deleting Parts', () => {
    
    cy.get('[class="rc-virtual-list-holder"]',{timeout: 20000}).should('be.visible');

    cy.get('[data-icon="search"]').eq(2).click();
    cy.get('.ant-input')
    .eq(1)
    .type('Test');

    cy.get('[class="ant-space-item"]').contains('Search').click();

    cy.get('.rc-virtual-list-holder-inner > :nth-child(1) > :nth-child(2)',{ timeout: 20000}).should('have.text','Test Brand - Engine Oil');


    //edit button
    cy.get('[class="ant-typography edit-text css-czsvtd"]').click();
    

    //delete button
    cy.get('.west-container > .ant-btn').click()

    cy.get('[type="button"]').contains('Yes').click();
    cy.get('[class="ant-notification-notice-message"]', { timeout: 20000 }).should('have.text', 'Success');

    

    
  });

})