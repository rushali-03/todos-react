import React, {Component} from 'react';
import '../App.css';
class Todo extends Component{

  handleOnChange(){
    this.props.todo.isCompleted = !this.props.todo.isCompleted;
    console.log(this.props.todo.isCompleted);
    let identity = this.props.todo.id;

    let todos = JSON.parse(localStorage.getItem('todos'));
    for(let i=0; i<todos.length; i++){
      if(todos[i].id === identity){
        console.log('todos: ', todos[i]);
        console.log("todos before:", todos[i].isCompleted);
        todos[i].isCompleted = !todos[i].isCompleted;
        console.log("todos after:", todos[i].isCompleted);
      }
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  render(){

    return (
      <div className='task-div'>
        <input 
          type="checkbox" 
          id="task"
          onChange={this.handleOnChange.bind(this)}
        />
        <label for="task"
          className={this.props.todo.isCompleted ? 'label-complete' : 'label-incomplete'}
          /*onDoubleClick={() => handleEdit(this.props.todo)}*/>
          {this.props.todo.text}
        </label>
        <button 
          className='close' 
          onClick={this.props.deleteTodo.bind(this, this.props.todo)}
          >X
        </button>
      </div>
    );
  }
}

export default Todo