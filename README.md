## :electric_plug: fio
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgnuns%2Ffio.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgnuns%2Ffio?ref=badge_shield)

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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fgnuns%2Ffio.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fgnuns%2Ffio?ref=badge_large)