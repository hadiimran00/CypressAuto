import 'cypress-file-upload';


Cypress.Commands.add('LoginAndNav',(email,password,menuitem) => {
    
    cy.visit('https://uat.okayker.com/');

    // Clear and type the email address
    cy.get('[placeholder="Email"]').clear().type(email);

    // Clear and type the password
    cy.get('[placeholder="Password"]').clear().type(password, { sensitive: true });

    // Click the login button
    cy.get('.ant-btn').click();

    cy.get('.custom-menu', { timeout: 40000 }).contains(menuitem).click();
})

Cypress.Commands.add('login', () => {
  cy.fixture('login').then((loginData) => {
    cy.session('Session', () => {
      cy.visit('/');
      cy.get('#email-address-input').type(loginData.email);
      cy.get('#password-input').type(loginData.password);
      cy.get('#login-button').click();
      cy.wait(5000);
    });
  });
});



// describe('Login',()=>{
//     it('Session Created', () => {

//         cy.session('my-session', () => {
//             cy.visit('/');
//             cy.get('[type="text"]').type('mhadiimran042@gmail.com');
//             cy.get('[type="password"]').type('qwerty');
//             cy.get('[type="button"]').click();
            
//           });
        
//     });
// })
