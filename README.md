## fio
simple socket relay tool

#### install
```sh
npm install -g fio-cli
```

#### use
```sh
# will connect to the unix socket and relay to the 8080 tcp port
fio /my/socket/path.sock 8080

# will connect to the tcp port 22 and relay to 4242
fio localhost:22 4242

# will connect to the tcp port 80 and relay to the unix socket
fio localhost:80 ./test.sock
```
