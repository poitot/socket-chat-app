import logo from './logo.svg';
import './Chat.css';


function Chat() {
  return (
    
    <div className="Chat">
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
      </script>
      <header className="Chat-header">
      <div class="text-center">
    <h1 class="display-4">Welcome</h1>
    <p>Learn about <a href="https://docs.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
    </div>

<div id="chatContainer">

    <ul id="group-chat" class="list-group chat">
        <li class="list-group-item list-group-item-dark">
            <div>
            <span style={{display: 'inline'}}>username: </span>
            <span style={{display: 'inline'}}>System: Connecting</span>
            </div>
            </li>
        <li class="list-group-item list-group-item-dark">System: Connected</li>
    </ul>
</div>
<div class="list-group ">
    <ul class="msgComp list-group">
            <li class="list-group-item list-group-item-dark"> 
                <input id="msgInput" class="msgIn" type="text" placeholder="Message..."/>
                <button id="addTextMsg" class="btn" onclick="msgOnclick()">Send</button>
            </li>
        
    </ul>

</div>




      </header>
    </div>
    
  );
}

export default Chat;
