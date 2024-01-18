describe('All Orders Tab', () => {

    before('Login', () => {
        cy.session('my-session', () => {
            cy.LoginAndNav('asjad@okayker.com', 'Theasjad666', 'All Orders');
          });
        
          
       

    })

    it('Status Filter', () => {
        
        

        cy.visit('/');
        


        cy.intercept({
            method: 'GET',

            url: 'https://test.okayker.com/api/orders/get/from/*/*'
        }, {
            fixture: 'orders'
        }
        ).as('allorders')



        cy.intercept({
            method: 'GET',
            url: 'https://test.okayker.com/api/orders/get/active'
        }, {

            fixture: 'orders'
        }).as('activeorders')






        cy.get('[placeholder="Select date"]').eq(0).click();



        cy.wait("@activeorders", { timeout: 200000 });

        cy.wait('@allorders', { timeout: 100000 });

        cy.get('[title="2023-10-11"] > .ant-picker-cell-inner').click();
        cy.get('.ant-checkbox-wrapper').contains('By Create Date').click();
        cy.get('.ant-table-container').should('be.visible');
        //cy.get(':nth-child(2) > .ant-checkbox > .ant-checkbox-input').uncheck();
        cy.get('.ant-checkbox-wrapper').contains('By App. Date').click();


        // cy.get(':nth-child(4) > .ant-checkbox > .ant-checkbox-input').check();

        cy.get('.ant-checkbox-wrapper').contains('By Complete Date').click();

        cy.get('.ant-checkbox-wrapper').contains('By Create Date').click();
        // cy.get(':nth-child(1) > .ant-checkbox > .ant-checkbox-input').check();

        cy.get('.ant-checkbox-wrapper').contains('Strict Mode').click();

        cy.get('.ant-checkbox-wrapper').contains('By Complete Date').click();



        function StatusFilter(StatusName) {

            // Click the filter icon.
            cy.get('[class="anticon anticon-filter"]').click();

            // Click the status to be filtered
            cy.get('[class="ant-checkbox-wrapper"]').contains(StatusName).click();

            // Click the filter button.
            cy.get('[class="ant-btn general-btn my-general-btn"]').click();

            // Assert that the selected status is visible
            cy.get('.virtual-table-cell').contains(StatusName).as('status');
            cy.get('@status').should('be.visible');
            cy.get('@status').should('have.text', StatusName);

        }

        const StatusesName = [
            'Inquiry',
            'Services Confirmed',
            'QC',
            'Quotation Approved',
            // 'Payment Collected',
            'Invoice Requested',
            'Invoice Sent',
            //'Order Completed',
            'Ready For Quotation',
            'Ready For Dispatch',
            'Customer Confirmed',
            'Parts Rate Confirmed',
            'Job In Progress'
        ];

        for (const StatusName of StatusesName) {
            StatusFilter(StatusName);
        }

    })

    it('Date Range Filter', () => {

        cy.visit('/');


        //from
        const datea = new Date('2023-10-10');
        const millifrom = datea.getTime();

        //till
        const dateb = new Date('2023-10-05');
        const millito = dateb.getTime();




        //  const response = cy.get('@18octOrders').response;


        cy.get('[style="margin-left: 8px;"] > .ant-picker-input > input').click();

        //from
        cy.get('.ant-picker-focused > .ant-picker-input > input').clear('2');
        cy.get('.ant-picker-focused > .ant-picker-input > input').type('2023-10-05{enter}');
        cy.get('[style="margin-right: 8px;"] > .ant-picker-input > input').click();
        cy.get('.ant-picker-focused > .ant-picker-input > input').clear();
        cy.get('.ant-picker-focused > .ant-picker-input > input').type('2023-10-10{enter}');
        cy.get('[style="display: flex; flex-direction: row;"] > .ant-btn').click();
        //   cy.wait('@18octOrders', { timeout: 100000 });

        // cy.get('@18octOrders').its('response.body').should('have.property', 'createdOn');
        // cy.get('@18octOrders').expect(res.body).to.include('Khalid')
        cy.intercept({
            method: 'GET',
            url: `https://test.okayker.com/api/orders/get/from/${millifrom}/${millito}`
            // url: `https://test.okayker.com/api/orders/get/from/**/**`

        }).as('5-10octOrders');

        cy.wait('@5-10octOrders', { timeout: 100000 }).then((interception) => {
            console.log(interception);
            const response = interception.response.body;
            const result = response.result;
            console.log("val : ", response);

            // Use the response object to perform your assertion
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                console.log(element.orderNo);
                expect(element.createdOn).to.be.least(`${millifrom}`);
                expect(element.createdOn).to.be.most(`${millito}`);

                // element.createdOn.should('be.within', 1697587200000, 1697673599999);
            }
        });



        cy.get(':nth-child(3) > .ant-btn').click({ timeout: 50000 });

            



    });

    it('Filter By Date (App Date, Create Date, By Complete Date)', () => {

        cy.visit('/');

        cy.intercept({
            method: 'GET',

            url: 'https://test.okayker.com/api/orders/get/from/*/*'
        }, {
            fixture: 'orders'
        }).as('allorders')


        cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').clear({ force: true });
        cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').type('2023-10-05{enter}');
        cy.wait('@allorders', { timeout: 100000 });
        cy.get('.virtual-table-cell').contains('Oct 5 2023 12:30 PM').as('AppTime');
        cy.get('@AppTime').should('be.visible');
        cy.get('@AppTime').should('have.text', 'Oct 5 2023 12:30 PM');

        function dateFilter() {
            cy.get('.virtual-table-cell')
                .as('ordersTable')
                .should('have.length', 9);
            cy.get('@ordersTable').should('be.visible');
            cy.get('[style="position: absolute; left: 0px; top: 0px; height: 68px; width: 130px;"]').should('have.text', '2023-36136');

        }

        cy.get('.ant-checkbox-wrapper-checked').contains(' By App. Date').click();
        //     .as('By App. Date')
        //     .click();
        //     dateFilter();


        cy.get('.ant-checkbox-wrapper').contains('By Create Date')
            .click();
        dateFilter();
        cy.get('.ant-checkbox-wrapper').contains(' By Create Date').click();

        cy.get('[class="ant-checkbox-wrapper"]').contains(' By Complete Date')
            .click();
        dateFilter();
        cy.get('.ant-checkbox-wrapper').contains(' By Complete Date').click();






    });






})

