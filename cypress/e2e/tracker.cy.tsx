/// <reference types="cypress"/>

describe("Address Tracking", () => {

  context("recipient tracking methods", () => {
    
    beforeEach(() => {
      cy.visit("https://pro.ipv4.ovh/mcgill/sd-nft");
    });

    it("successfully added address via email", () => {
      cy.get('select').select('EMAIL');
      cy.get("[type='email']").type('zich_zhang@hotmail.com');
      cy.get("[type='text']").type('0x268c9b61DB2703Bf2fDF53f11166B40f8051D4A1');
  
      cy.get('button').click();

      cy.get('.Toastify').within(() => {
        cy.get('.Toastify__toast-container').within(() => {
          cy.get('.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--success').within(() => {
            cy.get('.Toastify__toast-body').within(() => {
              cy.get('div').eq(1).should('have.text', 'Address added successfully');
            })
          })
        })
      })
    });

    it("successfully added address via sms", () => {
      cy.get('select').select('SMS');
      cy.get("[type='tel']").type('+15145882788');
      cy.get("[type='text']").type('0x268c9b61DB2703Bf2fDF53f11166B40f8051D4A1');
  
      cy.get('button').click();

      cy.get('.Toastify').within(() => {
        cy.get('.Toastify__toast-container').within(() => {
          cy.get('.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--success').within(() => {
            cy.get('.Toastify__toast-body').within(() => {
              cy.get('div').eq(1).should('have.text', 'Address added successfully');
            })
          })
        })
      })
    });
    
    it("entered invalid email address", () => {
      cy.get('select').select('EMAIL');
      cy.get("[type='email']").type('zich_zhang');
      cy.get("[type='text']").type('0x268c9b61DB2703Bf2fDF53f11166B40f8051D4A1');
  
      cy.get('button').click();

      cy.get('.Toastify').within(() => {
        cy.get('.Toastify__toast-container').within(() => {
          cy.get('.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--warning').within(() => {
            cy.get('.Toastify__toast-body').within(() => {
              cy.get('div').eq(1).should('have.text', 'Please enter a valid email address');
            })
          })
        })
      })
    });

    it("entered invalid phone number", () => {
      cy.get('select').select('SMS');
      cy.get("[type='tel']").type('123456789');
      cy.get("[type='text']").type('0x268c9b61DB2703Bf2fDF53f11166B40f8051D4A1');
  
      cy.get('button').click();

      cy.get('.Toastify').within(() => {
        cy.get('.Toastify__toast-container').within(() => {
          cy.get('.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--warning').within(() => {
            cy.get('.Toastify__toast-body').within(() => {
              cy.get('div').eq(1).should('have.text', 'Please enter a valid phone number');
            })
          })
        })
      })
    });


    it("entered invalid ethereum address", () => {
      cy.get('select').select('SMS');
      cy.get("[type='tel']").type('+15145882788');
      cy.get("[type='text']").type('0x268c9b61DB2703Bf2fDF53f11166B40f8051D4A');
  
      cy.get('button').click();

      cy.get('.Toastify').within(() => {
        cy.get('.Toastify__toast-container').within(() => {
          cy.get('.Toastify__toast.Toastify__toast-theme--colored.Toastify__toast--warning').within(() => {
            cy.get('.Toastify__toast-body').within(() => {
              cy.get('div').eq(1).should('have.text', 'Please enter a valid Ethereum address');
            })
          })
        })
      })
    });

  });
});

export {}