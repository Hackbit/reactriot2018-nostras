class webSocketConnection {
  static instance = null;

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
      console.log(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed trying to reopen");
      this.connect();
    };
  }
  post(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    } catch (err) {
      console.log(err.message);
    }
  }
  startChat(username) {
    this.post({ command: "init_chat", username: username });
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
