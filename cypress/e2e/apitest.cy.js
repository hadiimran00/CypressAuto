

describe('api', () => {

    before('login',()=>{

      cy.session('Session',()=>{

        cy.visit('/');
        cy.get('#email-address-input').type('asjad@okayker.com');
        cy.get('#password-input').type('asd123');
        cy.get('#login-button').click();
        cy.wait(5000) 

      })
      cy.getAllCookies() // Get all cookies
      .then((cookies) => {
        //expect(cookies[0]).to.have.property('name', 'identity_session_id')
        //expect(cookies[1]).to.have.property('name', 'session_id')
        cy.log(cookies)
      })
    })

    it('api', () => {

      cy.request({
        method: 'POST',
        url: 'https://test.autocore.io/api/users/update', 
        body: 
          {
            "_id": "656989661a6c8c457f2ba0a6",
            "firstname": "CYPRESSSSS",
            "lastName": "cypress",
            "email": "ibad.ahmed@okayker.com",
            "contact": "+92990889989889989",
            "type": "SUPERADMIN",
            "CNIC": "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",

            "oid": "656989661a6c8c457f2ba0a4",
            "wid": "656989661a6c8c457f2ba0a4",
            "fileList": [
                {
                    "url": "https://okaykerchatroomcontent.s3.ap-southeast-1.amazonaws.com/9088a58819d86aea1346a1d12d2aa154.jpg?1701943298972"
                }
            ],
            "services": [],
            "edit": true,
            "submitLoading": false,
            "deleteLoading": false,
            "firstName": "TEST NAME",
            "createdOn": 1701415270403,
            "verified": false,
            "active": true,
            "updatedOn": 1701517027178,
            "review": 5
        
        },
      })

      

    })
})
      
   
          
          
          

     
    


