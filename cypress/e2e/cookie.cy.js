// describe('Login Page Test', function () {

//     Cypress.Commands.add('postTokenLogin', () => {
//     it('test', () => {
        
   
//       cy.session('customer session', () => {
//         cy.visit('/');
//         cy.get('#email-address-input').type(loginData.email);
//         cy.get('#password-input').type(loginData.password);
//         cy.get('#login-button').click();
//         cy.wait(10000);
//       }, {
//         cacheAcrossSpecs: true
//       });
//     });
  
//     cy.intercept('https://test.autocore.io/api/users/login').then((response) => {
//       expect(response.body).to.have.property('firstName');
//       expect(response.body.token).to.have.property('authorization');
//       cy.setLocalStorage('token', response.body.token.authorization);
//     });

//     });
  
//     let token1 = '';
  
//     describe('HTTP Example', () => {
//       before(() => {
//         cy.postTokenLogin();
//         cy.saveLocalStorage();
//       });
  
//       beforeEach(() => {
//         cy.restoreLocalStorage();
//       });
  
//       it("the value of JWT Token should exist in localStorage", () => {
//         cy.getLocalStorage('token').then(token => {
//           cy.log("the token", token); // I get JWT Token in here
//         });
//       });
  
//       it('GET List ', () => {
//         cy.getLocalStorage('token').then((token) => {
//           token1 = token;
//         });
//         cy.log('Let Tokennn is ===>', token1); // Always Empty
  
//         cy.request({
//           method: 'GET',
//           url: '***/peopleList',
//           headers: {
//             'content-type': 'application/json',
//             'Authorization': token1 // ===> this is also empty
//           }
//         }).then((response) => {
//           expect(response.body).to.have.property('firstName');
//           expect(response.body).to.have.property('lastname');
//         });
//       });
//     });
//   });
  
describe('Login Page Test', function () {
  Cypress.Commands.add('postTokenLogin', () => {
    it('Login Test', () => { // Removed 'async' and 'await' since there are no asynchronous operations in the test
      const loginData = {
        email: 'hadi.imran@okayker.com',
        password: '@Qwerty123',
      };

      cy.session('customer session', () => {
        cy.visit('/');
        cy.get('#email-address-input').type(loginData.email);
        cy.get('#password-input').type(loginData.password);
        cy.get('#login-button').click();
        cy.wait(10000);
        cy.log('saa')
      });

      cy.intercept('POST', 'https://test.autocore.io/api/users/login').as('loginRequest');

      cy.wait('@loginRequest').then((interception) => {
        const response = interception.response;
        expect(response.body).to.have.property('firstName');
        expect(response.body.token).to.have.property('authorization');
        cy.setLocalStorage('token', response.body.token.authorization);
        console.log(response.body, "aa");
      });
    });
  });

  describe('HTTP Example', () => {
    beforeEach(() => {
      cy.postTokenLogin();
    });

    it('GET List', () => {
      cy.getAllLocalStorage('token').then((token) => {
        cy.request({
          method: 'GET',
          url: 'https://test.autocore.io/api/users/getall',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.body).to.have.property('firstName');
          expect(response.body).to.have.property('lastname');
        });
      });
    });
  });
});
