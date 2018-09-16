import React, { Component } from "react";
import "../styles/dashboard.css";
import BreathingGif from "../styles/breather.gif";
import Nostras from "../styles/nostradamus.jpg";
import ChatPanel from "./ChatPanel";
import ChatBox from "./ChatBox";
import WebSocketConnection from "../helpers/WebSocketConnection";

class BeforeChat extends Component {
  render() {
    return (
      <div className="CenterBlock col-6" id="BeforeChat">
        <img src={BreathingGif} id="Breather" alt="" />
        <form className="UserForm" onSubmit={this.props.setUserName}>
          <input
            className="form-control UserNameInput"
            ref={this.props.useref}
            id="UserName"
            placeholder="Choose Your Identity"
            required
          />
          <button className="UserBtn" type="submit">
            Use Me
          </button>
        </form>
      </div>
    );
  }
}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username") || "",
      socketConnection: null,
      chatrooms: JSON.parse(localStorage.getItem("chatrooms")) || [],
      chatroom_id: localStorage.getItem("chatroom_id") || ""
    };
    this.username = React.createRef();
  }
  componentWillMount() {
    let socket = new WebSocketConnection.instantiate();
    socket.connect();
    this.setState({
      socketConnection: socket
    });
  }
  setUserName = e => {
    e.preventDefault();
    this.setState({ username: this.username.current.value });
    localStorage.setItem("username", this.username.current.value);
  };

  render() {
    return (
      <div className="DashBoard">
        <div className="row">
          <div className="LeftBlock col-3">
            <div className="logo">ANON-Y-CHAT</div>
            <ChatPanel
              chatrooms={this.state.chatrooms}
              chatroom_id={this.state.chatroom_id}
            />
          </div>
          {this.state.username ? (
            <div className="CenterBlock col-6">
              <ChatBox
                socket={this.state.socketConnection}
                username={this.state.username}
                chatroom_id={this.state.chatroom_id}
              />
            </div>
          ) : (
            <BeforeChat setUserName={this.setUserName} useref={this.username} />
          )}
          <div className="RightBlock col-3">
            <h3 className="Nostitle">A Little Nugget About Team Nostras</h3>
            <div className="container NostHolder">
              <img src={Nostras} alt="" className="img-thumbnail Nostras" />
            </div>
            <article className="floss">
              <p>
                {" "}
                Well first off, Nostras is a one Dev team. Unfortunately a
                python back-end developer(Disclaimer for all the bugs you might
                encounter. Hopefully none). I recently started to tinker more
                with JS and frontend frameworks and so this as both a challenge
                and learning opportunity and at-least I had a reason to stay
                indoors for the whole weekend.
              </p>
              <br />
              <p className="credits">
                Well all that said. I surely had a lot of fun building this
                live-chat app and hope you will have a decent experience using
                it. ---PS-- The backend can be found at{" "}
                <em>wss://https://django-react-riot.herokuapp.com/ws/chat</em>
                --PS-- I allow you to use/misuse it.
              </p>
              <br />
              <p>
                --github-- <em className="credits">github.com/parseendavid </em>
                Feel free to throw feedback by way.
              </p>
                <p className="BigThankYou">THANKS...</p>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
