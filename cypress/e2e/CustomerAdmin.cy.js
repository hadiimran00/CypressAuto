describe('Customer Tab', () => {

  let createdVehicleId;

  

  // before('Logging in', () => {
  //   cy.session('my-session', () => {
  //     cy.LoginAndNav('asjad@okayker.com', 'Theasjad666', 'Customers');
  //   });

  // });

  // beforeEach('Logging in', () => {
  //   cy.visit('/');
  //   cy.get('.ant-btn').click();
  //   cy.get('.custom-menu', { timeout: 40000 }).contains('Customers').click();
  // });

  beforeEach('Logging In', () => {

    cy.fixture('login.json').then((loginData) => {
        cy.session('customer session', () => {
          cy.visit('/');
          cy.get('#email-address-input').type(loginData.email);
          cy.get('#password-input').type(loginData.password);
          cy.get('#login-button').click();
          cy.wait(10000);
        }, {
            cacheAcrossSpecs: true
          });                
    })

    cy.visit('/');
    //   cy.get('.ant-btn').click();
    cy.get('a.ant-menu-item-icon[href="/customers"]', { timeout: 10000 }).click();


  })



  it('Searching for Customer', () => {

    //entering contact number to search
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    
    cy.get('[type="submit"]').contains('Search').click();

    //Assert

    cy.get('[class="ant-table-tbody"]', { timeout: 20000 }).eq(0).invoke('text').then((text) => {
      cy.log(text);
    });
    cy.get('[class="ant-table-cell"]', { timeout: 20000 }).should('contain.text', 'Test Customer');

    cy.get('.ant-table-cell').should('be.visible')
    cy.get('.ant-table-cell').should('contain.text', '+923000000000')

  });

  it('Updating Customer', () => {
    //entering contact number to search
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();

    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 20000 }).should('contain.text', 'Test Customer');
    cy.get('[class="ant-table-tbody"]', { timeout: 15000 }).eq(0).click();
    cy.get('[class="name-container"]').should('have.text','Test Customer');

    cy.get('#edit-customer-button').click();

    cy.get('[name="fullName"]').clear().type('Test');
    cy.get('[type = "button"]').contains('Update').click();
    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessUser Updated Successfully!")
    cy.get('.ant-drawer-close').click();

    cy.get('[class="name-container"]').should('have.text','Test');

      //reset to default
    cy.get('#edit-customer-button').click();

    cy.get('[name="fullName"]').clear().type('Test Customer');
    cy.get('[type = "button"').contains('Update').click();

    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessUser Updated Successfully!")


    

    //cy.reload()  //once the customer update bug is solved removed this
    

  });

  // it('', () => {
    
  //   cy.get('[name="contact"]').eq(0).type('3000000000');
  //   cy.get('[type="submit"]').contains('Search').click();

  //   cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 50000 }).should('contain.text', 'Test');


  //   //clicking on that customer
  //   cy.get('[class="ant-table-tbody"]', { timeout: 15000 }).eq(0).click();
 

  //   cy.get('#edit-customer-button').click();

  //   // cy.get('[name="contact"]').eq(0).type('3000000000');
  //   // cy.get('[type="butto"]').contains('Search').click();

  //   // cy.get('[class="virtual-grid"]').eq(0, { timeout: 30000 }).should('contain.text', '+923000000000');

  //   // cy.get('[class="virtual-grid"]').eq(0, { timeout: 20000 }).invoke('text').then((text) => {
  //   //   cy.log(text);
  //   // });
  //   // cy.get('[class="virtual-grid"]', { timeout: 15000 }).eq(0).click();
  //   // // cy.get('[role="switch"]').click();

  //   // cy.get('[class="ant-switch"]').click();

  //   cy.get('[name="fullName"]').clear().type('Test Customer');
  //   cy.get('[type = "button"').contains('Update').click();

  //   cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessUser Updated Successfully!")
 


  // });

  it('Adding new vehicle for customer', () => {
 
    cy.intercept({
      method: 'POST',
      url: '/api/uservehiclemaps/register',
    }).as('CustomerVehicleRequest')



    //Searching for that customer
    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();

    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 50000 }).should('contain.text', 'Test Customer');


    //clicking on that customer
    cy.get('[class="ant-table-tbody"]', { timeout: 15000 }).eq(0).click();

    cy.get('[type="button"]').contains('New Vehicle',{timeout: 10000}).click();

    cy.get('#rc_select_0').type('Corolla');
   // cy.get('[class="ant-select-item-option-content"]', { matchCase: true }).contains('Corolla').click();

   cy.get('.ant-select-item-option-content').filter(':contains("Corolla")').eq(2).click();


    cy.get('[name="year"]').type('2013');

    //vehicle variant

    let a = "10TH GEN XLI";


    cy.get('[class="ant-form-item-control-input"]').eq(2).type(a);
    //cy.get('[role="option"]').eq(0).click();
    cy.get('[title="'+ a +'"]').click();

    cy.get('[name="registrationNo"]').type('t3st-r3g');

    cy.get('[name="mileage"]').type('12345');

    cy.get('[type="button"]').contains('Create').click();

    
    cy.get('[class="ant-notification-notice-content"]').invoke('text').then((text) => {
      cy.log(text);
    });
    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessVehicle Successfully Registered")
    cy.wait('@CustomerVehicleRequest', { timeout: 40000 }).then((interception) => {

      createdVehicleId = interception.response.body.result._id;
      console.log('Created Vehicle ID:', createdVehicleId);
      cy.log(createdVehicleId);
    
    });
    
  });

  it('Deleting Vehicle', () => {

    cy.get('[name="contact"]').eq(0).type('+923000000000');
    cy.get('[type="submit"]').contains('Search').click();

    cy.get('[class="ant-table-tbody"]').eq(0, { timeout: 50000 }).should('contain.text', 'Test Customer');

    cy.get('[class="ant-table-tbody"]', { timeout: 15000 }).eq(0).click();


    //cy.get('.ant-tabs-content-holder').scrollTo('bottom');

    cy.get('.rc-virtual-list-scrollbar-vertical > .rc-virtual-list-scrollbar-thumb').scrollTo('bottom');

   cy.get(`[data-row-key="${createdVehicleId}"]`).contains('Edit').click();

   //cy.get(`[data-row-key="655df9c4e77f816081f48038"]`).contains('Edit').click();


    cy.get('[data-icon="delete"]').click();

    cy.get('[type="button"]').contains('Yes').click();



    cy.get('[class="ant-notification-notice-content"]').should("have.text", "SuccessVehicle Deleted")



    
  });



})