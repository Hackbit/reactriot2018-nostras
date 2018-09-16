import React, { Component } from "react";
import "../styles/dashboard.css";
import ChatPanel from "./ChatPanel";
import ChatBox from "./ChatBox";
import WebSocketConnection from "../helpers/WebSocketConnection";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Mango-People",
      socketConnection: null
    };
  }
  componentWillMount() {
    let socket = new WebSocketConnection.instantiate();
    socket.connect();
    this.setState({
      socketConnection: socket
    });
  }
  render() {
    return (
      <div className="DashBoard">
        <div className="row">
          <div className="LeftBlock col-3">
            <div className="logo">ANON-Y-CHAT</div>
            <ChatPanel />
          </div>
          <div className="CenterBlock col-6">
            <ChatBox
              socket={this.state.socketConnection}
              user={this.state.user}
            />
          </div>
          <div className="RightBlock col-3" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
