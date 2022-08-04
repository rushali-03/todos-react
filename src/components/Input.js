import React, {Component} from 'react';
import '../App.css'

class Input extends Component{
  render(){
    return <input placeholder='What needs to be done?' className='todoInput' value={this.props.value} onChange={this.props.onChange} onKeyDown={this.props.onKeyDown} />;
  }
}

export default Input