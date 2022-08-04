import './App.css';
import Input from './components/Input';
import { useState } from "react";
import Todo from './components/Todo';
import React, {Component} from 'react';
import { uuid } from 'uuidv4';

class App extends Component{
  state = {
    text: '',
    todos: JSON.parse(localStorage.getItem('todos')),
    mode: "all",
  };

  // const [text, setText] = useState("");
  // const [todos, setTodos] = useState([]);
  // const [mode, setMode] = useState("all");

  addTodo = () => {
    const newTodos = [...this.state.todos, {text: this.state.text, id: new Date(), isCompleted: false}];
    this.setState({todos: newTodos});
    this.setState({text: ""}); 
    
    localStorage.setItem('todos', JSON.stringify([...this.state.todos, { text: this.state.text, isCompleted: false }]));
    console.log(localStorage.getItem('todos'));
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  onKeyDown = (e) => {
    if(e.keyCode === 13){
      console.log(e);
      this.addTodo();
    }
  };

  deleteTodo = (item) => {
    const newTodo = [...this.state.todos];
    const newListArray = newTodo.filter((item1) => {
       return item.id !== item1.id;
     });
    this.setState({todos: newListArray});
    
    localStorage.setItem('todos', JSON.stringify(newListArray));
    console.log(localStorage.getItem('todos'));
  };

  allFilter = () => {
    this.setState({mode: "all"});
    console.log(this.state.mode);
  }

  activeFilter = () => {
    this.setState({mode: "active"});
    console.log(this.state.mode);
  }

  completedFilter = () => {
    this.setState({mode: "completed"});
    console.log(this.state.mode);
  }

  clearCompleted = () => {
    const newTodo = [...this.state.todos];
    const newListArray = newTodo.filter(item1=> !item1.isCompleted);
    console.log(newListArray);
    this.setState({todos: newListArray});
    
    localStorage.setItem("todos", JSON.stringify(newListArray));
  }

  componentUpdate() {
    localStorage.setItem('todos', JSON.stringify([JSON.parse(localStorage.getItem('todos') || "[]"), { text: this.state.text, isCompleted: false }]));
  }

  render(){
    let listToMap = this.state.mode === "all" ? this.state.todos : this.state.mode === 'active' ? this.state.todos.filter (todo => !todo.isCompleted) : this.state.todos.filter (todo => todo.isCompleted);


    return (
      <div className="App">
        <p className="header-1">todos</p>
        <div className='input-row'>
          <Input 
            value={this.state.text} 
            onChange = {(e) =>this.setState({text: e.target.value})} 
            onKeyDown = {this.onKeyDown}
          />  
        </div>
        {listToMap.map((todo) => {
          return <Todo todo={todo} key={todo.id} deleteTodo = {this.deleteTodo}/>;
        })}
        <div className='Footer'>
          <p>Total Items: {this.state.todos.length}</p>
          <button className='footer-btn' onClick={this.allFilter}>All</button>
          <button className='footer-btn' onClick={this.activeFilter}>Active</button>
          <button className='footer-btn'onClick={this.completedFilter}>Completed</button>
          <button className='clear-completed' onClick={this.clearCompleted}>Clear Completed</button>
        </div>
      </div>
    );
  }
}

export default App;
