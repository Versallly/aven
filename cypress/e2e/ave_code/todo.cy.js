/// <reference types="cypress" />
import PO from './PO';
Cypress.on( 'uncaught:exception', (err, runnable) => false );
const page = new PO();

describe( 'Autotests TODO app', () => {
  before( function () {
    cy.fixture( 'example' ).then(( example ) => {
      this.email = example.email;
      this.pass = example.password;
    });
  });
  beforeEach(function () {
    cy.visit( '/' );
    page.login().type( this.email );
    page.pass().type( this.pass );
    page.loginBtn().click();
  });

  context( 'Create Task', () => {
    it( 'User is able to create a task', () => { // happy path
      page.task().should( 'not.exist' );
      cy.createTask( 'abc' );
      page.task().should( 'be.visible' );
      cy.contains( 'a', 'abc').should( 'be.visible' );
    });

    it( 'Task name should be 3 chars min', () => { // happy path
      page.task().should( 'not.exist' );
      cy.createTask( 'aa' );
      page.task().should( 'not.exist' );
      cy.contains( 'a', 'aa' ).should( 'not.exist' );
    });
  
    afterEach( function () {
      cy.wait(500);
      page.removeTask().click( {force: true} );
      page.task().should( 'not.exist' );
    });
  });

  context( 'Create Subtask', () => {

    it( 'User is able to create a Subtask', () => { // happy path
      page.task().should( 'not.exist' );
      cy.createTask( 'abcd' );
      page.task().should( 'be.visible' );
      cy.wait(500);
      page.manageSubTask( 0 ).click();
      page.subTaskInput().type( 'dce' );
      page.addSub().click();
      page.subTask( 'dce' ).should( 'be.visible' );
      page.closeBtn().click();
      cy.wait(500);
      page.manageSubTask( 1 ).should( 'be.visible' );
    });

    it( 'Date is required', () => { // bug
      page.task().should( 'not.exist' );
      cy.createTask( 'abcde' );
      page.task().should( 'be.visible' );
      cy.wait(500);
      page.manageSubTask( 0 ).click();
      page.subTaskInput().type( 'dcef' );
      page.date().clear();
      page.addSub().click();
      page.subTask( 'dcef' ).should( 'not.be.visible' );
    });

    afterEach( function () {
      page.removeTask().click( {force: true} );
      page.task().should( 'not.exist' );
    });

  });


});
