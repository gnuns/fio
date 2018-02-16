#!/usr/bin/node
const net = require('net')
const fs = require('fs')

let from, to

from = process.argv[2]
to = process.argv[3]

if (fs.existsSync(from)) {
  from = {path: from}
} else {
  const [host, port] = from.split(':')
  from = {host, port}
}

const relayServer = net.createServer((client) => {
  const connection = net.createConnection(from, () => {
  })
  client.on('data', (data) => {
    connection.write(data)
  });
  connection.on('data', (data) => {
    client.write(data)
  });
  connection.on('end', () => {
    if (!client.destroyed) client.end()
  })
  client.on('end', () => {
    if (!connection.destroyed) connection.end()
  })
})

relayServer.listen(to, () => console.log('relaying', from, 'to', to, '(localhost)'))
