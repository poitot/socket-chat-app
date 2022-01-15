import './ChatMessage.css';
import React from 'react';
import ReactDOM from 'react-dom';

export default class ChatMessage extends React.Component {
    constructor(props) {
      
      super(props);
  
      this.state = {
          message: props.message,
          user: props.user_name
      };
  
    }
    render() {
        return(
                <li class="list-group-item list-group-item-dark">
                    
                    <span class="message-text" style={{ display: 'inline-flex' }}>{this.state.user}: {this.state.message}</span>
                </li>
        )
    }
}