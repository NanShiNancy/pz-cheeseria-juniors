/// <reference types="cypress" />

context('Cart Actions', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    // Test adding items
    it('Add items to cart', () => {

        cy.get('[data-cy=add-to-cart-2]').click();
        cy.get('[data-cy=add-to-cart-3]').click();

        cy.get('[data-cy=badge-count]').should('have.text', '2');

    })

    // Test saving order
    it('Purchase items in the cart', () => {
        // Add a few items
        cy.get('[data-cy=add-to-cart-1]').click();
        cy.get('[data-cy=add-to-cart-2]').click();
        cy.get('[data-cy=add-to-cart-2]').click();
        cy.get('[data-cy=add-to-cart-3]').click();
        cy.get('[data-cy=add-to-cart-3]').click();

        // Check items amount
        cy.get('[data-cy=badge-count]').should('have.text', '5');

        // Finish purchase
        cy.get('[data-cy=go-to-cart]').click();
        cy.get('[data-cy=cart-purchase]').click();

        cy.get('[data-cy=main-notification]').should('have.text', 'Purchase success!');

        // Check recent order.
        cy.get('[data-cy=recent-purchases]').click();
        cy.get('[data-cy=recent-purchase-1-amount]').should('have.text', '1');
        cy.get('[data-cy=recent-purchase-2-amount]').should('have.text', '2');
        cy.get('[data-cy=recent-purchase-3-amount]').should('have.text', '2');

    })


})
