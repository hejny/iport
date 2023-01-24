/// <reference types="cypress" />

context('Local Collboard', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5000/');
    });

    describe('Visiting the page', () => {
        it('should be able to see the heading', () => {
            // cy.contains(/iport/i);
            cy.contains(/Seznam procesů/i);
        });
    });
});
