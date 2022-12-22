/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Register Tests', function () {
    beforeEach(() => {
        cy.visit('/register');

        cy.getBySel('sign-up-email').as('email');
        cy.getBySel('sign-up-username').as('username');
        cy.getBySel('sign-up-password').as('password');
        cy.getBySel('sign-up-submit').as('submit');
    });

    it('Successfull register', function () {
        cy.intercept('POST', '/api/users', {
            statusCode: 200,
            body: {
                user: {
                    email: "lucas.silva@stack.com",
                    username: "luska",
                    token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsImV4cCI6MTY3NjkwNDA2NX0.d-EWXMETOm9IQ6okAvdnzpBMMpoA6x7cBVXBtH2p06Y"
                }
            },
        })

        cy.get('@username').type('luska')
        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('P@ssword1')
        cy.get('@submit').click()

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

    it('Already used fields', function () {
        cy.intercept('POST', '/api/users', {
            statusCode: 422,
            body: {
                "errors": {
                    "email": [
                        "has already been taken"
                    ],
                    "username": [
                        "has already been taken"
                    ]
                }
            }
        })

        cy.get('@username').type('luska')
        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('P@ssword1')
        cy.get('@submit').click()

        cy.url().should('equal', 'http://localhost:3001/register')
        cy.get('.error-messages > li').first().should('have.text', 'email has already been taken')
        cy.get('.error-messages > li').last().should('have.text', 'username has already been taken')
    })

    it('Internal Error', function () {
        cy.intercept('POST', '/api/users', { statusCode: 500 })

        cy.get('@username').type('luska')
        cy.get('@email').type('lucas.silva@stack.com')
        cy.get('@password').type('luska')
        cy.get('@submit').click()

        cy.url().should('equal', 'http://localhost:3001/register')
        cy.get('.error-messages > li').should('have.text', 'internal error!')
    })
})
