import logo from './logo.svg';
import './App.css';
import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ChatMessage from './ChatMessage';
import io from 'socket.io-client';

// import bootstrap components


function App() {
  useEffect(() => {

  })
  return (
    <div className="App">
      <header className="App-header">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

        <Chat></Chat>
      </header>
    </div>
  );
}

export default App;

class Chat extends React.Component {
  constructor(props) {
    
    super(props);
    const connStr = "35.176.194.93:8080";
    this.chatSelector = "#group-chat";
    this.msgSelector = "#msgInput";
    let socket;

    this.state = {
      messageList: [],
      socket: socket
    };

  }

  componentDidMount() {
    const connStr = "http://localhost:3001";
    this.socket = io(connStr);
    this.socket.on("connection", (socket) => {
      console.log("connected to server");
      this.setState({socket: this.socket})
    });
    this.socket.on("receive-chat-msg", (msg) => {
      console.log("msg received: " + msg);
      var messageComponent = this.createMessage(msg);
      var msgList = this.state.messageList;
      msgList.push(messageComponent);
      this.setState({messageList: msgList});
      this.displayMessage(this.state.messageList);
      
    });

    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  
  // used to display a message to the chat box (rendering a new <li> element by updating state.messageList array)
  // called directly to display messages received from server
  displayMessage(list) {

    ReactDOM.render(list, document.getElementById('group-chat'));
    console.log(list);
  }

  createMessage(msg) {
    var messageComponent = <ChatMessage user_name="test_user" message={msg}></ChatMessage>;
    return messageComponent;
  }

  handleChange(event) {
    this.message = event.target.value;
  }

  handleSubmit() {
    this.socket.emit('message', this.message);
    console.log("msg sent", this.message);
    this.message = "";
    document.querySelector('#msgInput').value = "";
    }

  // checks if the message is empty...
  checkMessage(message) {
    if (message !== null) {
      if (message !== "") {
        return true;
      }
      console.log("Error: input empty string");
      return false;
    }
    console.log("Error: input is null")
    return false;
  }

  render() {
    return (
      <div id="chatContainer">

    <ul id="group-chat" class="list-group chat">
      {this.state.messageList}
    </ul>

    <div class="list-group ">
      <ul class="msgComp list-group">
        <li class="list-group-item list-group-item-dark">
            <input id="msgInput" class="msgIn" type="text" placeholder="Message..." onChange={this.handleChange.bind(this)}></input>
            <button id="addTextMsg" class="btn" type="submit" onClick={this.handleSubmit.bind(this)}>Send</button>
        </li>
      </ul>
    </div>
    </div>
    )
  }

}