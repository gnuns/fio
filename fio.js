#!/usr/bin/env node
const net = require('net')
const fs = require('fs')

main()

function main () {
  const [from, to] = process.argv.slice(2, 4)
  if (!to) return info()
  if (fs.existsSync(from)) return relay({path: from}, to)

  let [host, port] = from.split(':')
  if (!port) {
    port = host
    host = 'localhost'
  }
  relay({host, port}, to)
}

function relay (from, to) {
  const relayServer = net.createServer(listenEvents.bind(this, from))
  relayServer.on('error', handleErrors)
  relayServer.listen(to, () => console.log('relaying', from, 'to', to))
}

function listenEvents (from, client) {
  const connection = net.createConnection(from)
  client.on('data', (data) => connection.write(data))
  connection.on('data', (data) => client.write(data))
  connection.on('end', () => {
    if (!client.destroyed) client.end()
  })
  client.on('end', () => {
    if (!connection.destroyed) connection.end()
  })
}

function handleErrors (e) {
  if (e.code === 'EACCES') {
    return console.error('ERROR!', 'Permission denied', `(${e.message})`)
  }
  if (e.code === 'EADDRINUSE') {
    return console.error('ERROR!', 'Address already in use', `(${e.message})`)
  }
  return console.error('ERROR!', e.message)
}

function info () {
  const {version} = require('./package.json')
  const examples = [
    [
      '  FROM unix socket TO the 8080 tcp port (localhost)',
      'fio /my/socket/path.sock 8080'
    ],
    [
      '  FROM tcp port 22 TO tcp port 4242 (localhost)',
      'fio localhost:22 4242'
    ],
    [
      '  FROM tcp port 80 at google.com TO unix socket',
      'fio google.com:80 ./test.sock'
    ]
  ]
  console.log('fio - simple socket relay tool')
  console.log(`Version: ${version}`)
  console.log('Usage: fio [FROM] [TO]')
  console.log('Examples:')
  console.log(examples.map((example) => example.join('\n\t')).join('\n\n'))
}
