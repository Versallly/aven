class PO{
/// Login
    login(){
        return cy.get( '#user_email' );
    }

    pass(){
        return cy.get( '#user_password' );
    }

    loginBtn(){
        return cy.get( '[type="submit"]' );
    }
/// Tasks
    task(){
        return cy.get( '.task_body' );
    }
    subTaskInput( n ){
        return cy.get( "[name='new_sub_task']" );
    }
    date(){
        return cy.get("#dueDate");
    }
    addSub(){
        return cy.get( '#add-subtask' );
    }
    closeBtn(){
        return cy.contains( 'button', 'Close' );
    }
    removeTask(){
        return cy.contains( 'button', 'Remove' );
    }
    manageSubTask( n ){
        return cy.contains( `(${n}) Manage Subtasks` );
    }
    subTask( name ){
        return cy.contains( 'a[editable-text="sub_task.body"]', `${name}`);
    }

}

export default PO;