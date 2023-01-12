// import SockJsClient from 'react-stomp';
import SockJsClient from 'react-stomp';
import React from 'react';


const url = "http://localhost:8080/ws";

function SocketMessage({ username }) {

    let onConnected = () => {
      console.log("Connected!!")
    }
  
    let onMessageReceived = (msg) => {
      // console.log(msg.username);
      if(msg.username === username) {
        alert(msg.message)
      }            
    }
  
    return (
      <div>
        <SockJsClient
          url={url}
          topics={['/topic/message']}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={msg => onMessageReceived(msg)}
          debug={false}
        />
      </div>
    );
}

export default SocketMessage;