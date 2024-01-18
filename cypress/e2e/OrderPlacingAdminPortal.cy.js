
describe('Admin Portal', () => {
  before(() => {
    // Visit the website and log in before each test.
    cy.session('my-session', () => {
      cy.visit('/');
      cy.get('[type="text"]').type('mhadiimran042@gmail.com');
      cy.get('[type="password"]').type('qwerty');
      cy.get('[type="button"]').click();
    });

  });



  it('should allow users to place an order successfully', () => {
    cy.visit('/');
    cy.get('[type="button"]').click();

    // Navigate to the Operatnpions section.
    cy.get('.navigation-text').contains('Operations').click();

    // // Enter a contact number.
    cy.get('[placeholder="Enter contact number"]').type('300000000');

    // Wait for autosuggest options to load.
    //cy.get('.react-autosuggest__suggestion').should('be.visible');

    // // Select the first suggestion.
    //     cy.get('.react-autosuggest__suggestion')
    //     .first()
    //     .click();

    //cy.wait(60000);

    cy.get('.react-autosuggest__suggestion', { timeout: 1000000 }).should('be.visible');


    cy.get('.react-autosuggest__suggestion').first().click();


    // Enable a switch.
    cy.get('button[role="switch"]').first().click();

    cy.wait(2000);

    // Select options from dropdowns.
    cy.get('#rc_select_12').click();
    cy.get('[class="ant-select-item ant-select-item-option"]', { timeout: 50000 }).eq(0).click();


    cy.get('.ant-form-item-control-input-content .ant-select-selector .ant-select-selection-overflow')
      // .wait(2000)
      .eq(1)
      .click()


    cy.get('.ant-select-selector', { timeout: 100000 }).should('be.visible');
    cy.get('.rc-virtual-list-holder-inner').eq(1).type('diagnosis').click();
    //  cy.get('.rc-virtual-list-holder-inner').eq(2).type('oil').first().click();
    // cy.get('.ant-select-selector', { force:true }).eq(12).first().click();
    cy.contains('Select Sub Services').click();

    // cy.get(':nth-child(6) > .ant-row-space-between > .ant-col-xs-24 > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-overflow', {timeout: 100000}).click();
    // cy.get('.rc-virtual-list-holder-inner', { timeout: 2000000 }).should('be.visible');
    //  cy.get('[title="Denso-Spark Plug "] > .ant-select-item-option-content', { timeout: 100000 }).click();
    //  cy.get('.rc-virtual-list-holder-inner').eq(2).type('oil').first().click();
    //  cy.contains('Select Parts').click();
    //  cy.get('.ant-select-selector').eq(0).first().click();
    cy.get('.ant-select-selector').eq(0).type('Test Workshop');
    cy.get('.rc-virtual-list-holder-inner', { timeout: 2000000 }).should('be.visible');
    cy.get('.rc-virtual-list-holder-inner').eq(1);
    cy.get('.ant-select-item.ant-select-item-option[aria-selected="false"]').contains('Test Workshop').click({ force: true });
    cy.get('[class="ant-btn general-btn my-general-btn"]').contains('Submit Order').click();
    cy.wait(5000);
    cy.get('.ant-select-selector', { timeout: 2000000 }).should('be.visible');

    cy
      .intercept('https://test.okayker.com/api/orders/update')
      .as('registerapi');

    statusflow('Services Confirmed');
    statusflow('Parts Rate Confirmed');


    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Services Confirmed ').click();
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Parts Rate Confirmed ').click();
    cy.get('.ant-select-selector').eq(0).first().click();
    // cy.get('.ant-select-selector').eq(14).type('Test Workshop');
    //cy.get('.ant-select-item.ant-select-item-option[aria-selected="false"]').contains('Test Workshop').click({ force: true });
    // cy.get('.ant-select-selector').eq(15).type('Test Workshop');
    cy.get('.ant-select-item.ant-select-item-option[aria-selected="false"]').contains('Test Workshop').click({ force: true });
    // cy.get('.ant-select-selector').eq(16).type('Test Workshop');
    //  cy.get('.ant-select-item.ant-select-item-option[aria-selected="false"]').contains('Test Workshop').click({ force: true });
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Ready For Quotation ').click();
    statusflow('Ready For Quotation');
    statusflow('Quotation Sent');


    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Quotation Sent ').click();

    //   cy.get('[class="ant-btn general-btn color-white"]')
    // .contains('Approve Quotation')
    // .then(($el) => {
    //   // Re-query for the element
    //   cy.get($el).click();
    // });


    cy.get('[style="flex: 1 1 0%; text-align: right;"] > .ant-btn').click();
    cy.get('.ant-btn').contains('Approve Quotation').click();
    cy.get('[class="ant-btn general-btn"]').contains(' Quotation Approved ').click();
    cy.get('[style="margin-right: 8px; background-color: rgb(44, 162, 94); border-color: rgb(44, 162, 94);"]').click();
    cy.wait(2000);
    // cy.get('[class="ant-btn general-btn"]')
    //   .contains(' Parts Picked ')
    //   .click();
    cy.get('[class="ant-btn general-btn"]').contains(' Parts Procured ').click();



    const orderStatus = [
      //   'Services Confirmed',
      //   'Parts Rate Confirmed',
      //   'Ready For Quotation',
      //   'Quotation Sent',
      //   'Customer Confirm',
      'Guru Dispatched',
      'QC',
      'Request Invoice',
      'Invoice Sent',
      //' Payment Collected ',
    ]

    function statusflow(orderStatus) {
      cy
        .get('[class="ant-btn general-btn color-white"]')
        .contains(orderStatus)
        .click();
      cy
        .wait('@registerapi');
      cy
        .get('.ant-notification-notice-success')
        .should('be.visible')
    }

    // Selecting workshop for services
    cy.get('#rc_select_16').click();
    cy.get(':nth-child(9) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('#rc_select_15').click();
    cy.get(':nth-child(10) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    
    // Find all elements with the role "combobox" and iterate over them
    // cy.get('[role="combobox"]').each(($combobox) => {
    //   // Click on the combobox element
    //   cy.wrap($combobox).click();

    //   // Find and click the "Test Workshop" option within the combobox
    //   cy.get('[class="ant-select-item-option-content"]').contains('Test Workshop').click();
    // });




    cy.get('.ant-row-space-between > :nth-child(4) > p').click();
    cy.get(':nth-child(2) > [style="width: 80px; border: 1px solid black; display: flex; justify-content: center; align-items: center; font-size: 24px;"] > [style="margin-left: 12px;"] > .anticon > svg').click();
    //cy.get('[class="ant-btn general-btn color-white"]').contains(' Customer Confirm ').click({ force: true });
    //cy.wait('@registerapi');
    statusflow('Customer Confirm');

    //Putting Address
    cy.get('.ant-row-space-between > :nth-child(4) > p').click();
    cy.get(':nth-child(2) > [style="border: 1px solid black; padding: 8px; flex: 1 1 0%;"]').click();
    cy.get(':nth-child(4) > [style="width: 80px; border: 1px solid black; display: flex; justify-content: center; align-items: center; font-size: 24px;"] > [style="margin-left: 12px;"]').click();

    cy.get('[class="ant-btn general-btn"]').contains(' Guru Assigned ').click();
    cy.wait('@registerapi');
    cy.get('.ant-notification-notice-success').should('be.visible')
    for (const Statuss of orderStatus) {
      statusflow(Statuss);
    }
    cy.get('[class="ant-btn general-btn"]').contains('Payment Collected').click();
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Guru Dispatched ').click();
    // // cy.wait('@registerapi');
    // cy.get('.ant-notification-notice-success').should('be.visible')
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' QC ').click();
    // cy.wait('@registerapi');
    // cy.get('.ant-notification-notice-success').should('be.visible')
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Request Invoice ').click({ force: true });
    // cy.wait('@registerapi');
    // cy.get('.ant-notification-notice-success').should('be.visible')
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Invoice Sent ').click();
    // cy.wait('@registerapi');
    // cy.get('.ant-notification-notice-success').should('be.visible')
    // cy.get('[class="ant-btn general-btn color-white"]').contains(' Payment Collected ').click();
    // cy.wait('@registerapi');
    // cy.get('.ant-notification-notice-success').should('be.visible')
    cy.get('[class="ant-btn general-btn my-general-btn"]').contains(' Past Orders ');
    cy.wait('@registerapi');
    cy.get('[name="note"]').type('automation test');
    cy.get(':nth-child(11) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-picker > .ant-picker-input > input').click();
    cy.get('[class="ant-picker-today-btn"]').contains('Today').click();
    cy.get(':nth-child(8) > div > .ant-btn').click();
    cy.wait(2000);
    cy.get('.virtual-grid').should('be.visible');
    cy.get('[type="button"]').contains('OK').click();
    cy.get('[style="display: flex; flex-direction: row; align-items: center; background-color: white; padding-bottom: 4px; border-bottom: 1px solid rgb(119, 119, 119);"] > :nth-child(2) > button').click({ force: true });
    const statuses = [
      'INQUIRY',
      'SERVICES_CONFIRMED',
      'PARTS_RATE_CONFIRMED',
      'READY_FOR_QUOTATION',
      'QUOTED',
      'QUOTATION_APPROVED',
      'PARTS_PICKED',
      'READY_FOR_DISPATCH',
      'CUSTOMER_CONFIRMED',
      'READY_FOR_JOB',
      'JOB_IN_PROGRESS',
      'QC',
      'INVOICE_REQUESTED',
      'INVOICE_SENT',
      'PAYMENT_COLLECTED',
    ];

    cy.get('.ant-tabs-content-holder')
      .should(($element) => {
        // Get the text content of the element
        const elementText = $element.text();

        // Check that all statuses are present in the element's text
        statuses.forEach((status) => {
          expect(elementText).to.contain(status);
        });
      });

    cy.get('[type="button"]').contains('OK').click({ force: true });
    cy.get('[type="button"]').contains('OK').click({ force: true });

    cy.get('[style="display: flex; flex-direction: column; background-color: white; margin-left: 12px;"] > :nth-child(3) > div > p').then(($element) => {
      const text = $element.text();
      cy.log(`Order No to delete: ${text}`);
    })



      //service
      
   
  
  });


})


