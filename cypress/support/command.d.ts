declare namespace Cypress {
    interface Chainable {
        /**
         * Logs In and navigate to desired Tab of Okayker Admin Portal
         * 
         * @example 
         * cy.LoginAndNav('example@okayker.com','passwordhere','All Orders');
         */
        LoginAndNav();
    }
}