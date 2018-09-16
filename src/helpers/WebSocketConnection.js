class webSocketConnection {
  static instance = null;
  callbacks = { init_chat: null, new_message: null, fetch_messages: null };

  static instantiate() {
    if (!webSocketConnection.instance) {
      webSocketConnection.instance = new webSocketConnection();
    }
    return webSocketConnection.instance;
  }
  connect() {
    const path = "wss://django-react-riot.herokuapp.com/ws/chat";
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket opened");
    };
    this.socketRef.onmessage = e => {
      // write to state
      let data = JSON.parse(e.data);
      switch (data.command) {
        case "init_chat":
          this.callbacks.init_chat(data);
          break;
        case "new_message":
          this.callbacks.new_message(data);
          break;
        case "messages":
          this.callbacks.fetch_messages(data);
          break;
        default:
          console.log("You might wanna talk security.");
      }
    };

    this.socketRef.onerror = e => {
      // Flash error
      console.log(e);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed trying to reopen");
      this.connect();
    };
  }
  setCallbacks(...callbacks) {
    this.callbacks = Object.assign(this.callbacks, callbacks[0]);
  }
  post(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }
  startChat(username, chatroom) {
    this.post({ command: "init_chat", username: username, chatroom: chatroom });
  }
  sendMessage(data) {
    this.post({
      command: "new_message",
      ...data
    });
  }
  fetchMessages(chatroom) {
    console.log(chatroom);
    this.post({ command: "fetch_messages", chatroom: chatroom });
  }
}
export const awaitConnection = (socket, callback) => {
  const recursion = awaitConnection;
  const socketRef = socket ? socket.socketRef : null;
  setTimeout(function() {
    if (socketRef.readyState === 1) {
      if (callback != null) {
        callback();
      }
      return;
    } else {
      console.log("waiting...");
      recursion(socket, callback);
    }
  }, 500);
};
export default webSocketConnection;
