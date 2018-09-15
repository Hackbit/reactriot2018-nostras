import React, { Component } from "react";
import "../styles/dashboard.css";
import ChatPanel from "./ChatPanel";

class Dashboard extends Component {
  render() {
    return (
      <div className="DashBoard">
        <div className="row">
          <div className="LeftBlock col-3">
            <div className="logo">ANON-Y-CHAT</div>
            <ChatPanel />
          </div>
          <div className="CenterBlock col-6" />
          <div className="RightBlock col" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
