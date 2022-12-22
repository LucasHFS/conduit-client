/* eslint-disable no-undef */

/// <reference types="cypress" />

describe('Login Tests', function () {
    beforeEach(() => {
        cy.visit('/login');

        cy.getBySel('sign-in-email').as('email');
        cy.getBySel('sign-in-password').as('password');
        cy.getBySel('sign-in-submit').as('submit');
    });

    it('Successfull login', function () {
        cy.intercept('POST', '/api/users/login', {
            statusCode: 200,
            body: {
                user: {
                    email: "lucas.silva@stack.com",
                    username: "luska",
                    token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsImV4cCI6MTY3NjkwNDA2NX0.d-EWXMETOm9IQ6okAvdnzpBMMpoA6x7cBVXBtH2p06Y"
                }
            },
        })

        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('luska{enter}')

        cy.url().should('equal', 'http://localhost:3001/')

        cy.getCookie('conduit.token')
            .should('have.property', 'value', 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsImV4cCI6MTY3NjkwNDA2NX0.d-EWXMETOm9IQ6okAvdnzpBMMpoA6x7cBVXBtH2p06Y')

        cy.getBySel('nav-profile')
            .should('have.attr', 'href', '/@luska')
        cy.getBySel('nav-settings')
            .should('have.attr', 'href', '/settings')
        cy.getBySel('nav-new-article')
            .should('have.attr', 'href', '/editor')
    })

    it('Incorrect password', function () {
        cy.intercept('POST', '/api/users/login', {
            statusCode: 422,
            body: {
                errors: {
                    "email or password": [
                        "is invalid"
                    ]
                }
            }
        })

        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('luska{enter}')

        cy.url().should('equal', 'http://localhost:3001/login')
        cy.get('.error-messages > li').should('have.text', 'email or password is invalid')
    })

    it('Internal Error', function () {
        cy.intercept('POST', '/api/users/login', { statusCode: 500 })

        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('luska')
        cy.get('@submit').click()

        cy.url().should('equal', 'http://localhost:3001/login')
        cy.get('.error-messages > li').should('have.text', 'internal error!')
    })
})
