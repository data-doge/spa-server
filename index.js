const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

const wss = new WebSocketServer({ port: 3434 })

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    // Broadcast any received message to all clients
    console.log('received: %s', message)
    wss.broadcast(message)
  })
})

wss.broadcast = function (data) {
  this.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}
