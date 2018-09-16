class webSocketConnection {
  static instance = null;

  static instantiate() {
    if (!webSocketConnection.instance) {
      webSocketConnection.instance = new webSocketConnection();
    }
    return webSocketConnection.instance;
  }
  connect() {
    const path = "ws://localhost:5000/ws/chat";
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
}

export default webSocketConnection;
