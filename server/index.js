const webSocketServer = require("websocket").server;
const http = require("http");
const webSocketsServerPort = 8000;

const server = http.createServer();
server.listen(webSocketsServerPort);
console.log("listening on port 8000....");

const wsServer = new webSocketServer({
  httpServer: server,
});

const generateID = () => "id" + Math.random().toString(16).slice(2);
const connectedUsers = {};

wsServer.on("request", function (request) {
  var id = generateID();
  console.log("Connection request from " + request.origin + ".");

  const connection = request.accept(null, request.origin);
  connectedUsers[id] = connection;
  console.log(
    "Connection established: " +
      id +
      " in " +
      Object.getOwnPropertyNames(connectedUsers),
  );

  connection.on("message", function (message) {
    console.log("Received Message: ", message.utf8Data);
    for (id in connectedUsers) {
      connectedUsers[id].sendUTF(message.utf8Data);
      console.log("Sent Message to: ", connectedUsers[id]);
    }
  });
});
