# PostgreSQL Server 9.4 for Linux x86 64-bit

Install and run [PostgreSQL server](http://www.postgresql.org) under the current user inside of the application directory.

```
npm install pg-server-9.4-linux-x64
```

Provides function for spawning PostgreSQL server instance specifying the data directory and configuration options. Returns [`ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess).

```javascript
var startServer = require('pg-server-9.4-linux-x64');

/*
 * Start the PostgreSQL server
 * @param {String} dataDir Directory will be initialized if does not exist
 * @param {Object} config  Settings for postgresql.conf
 */
var postgres = startServer('dbdata', { port: 12345 });

postgres.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

postgres.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

postgres.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

// Later on, stop server...
postgres.kill();

```

## Default Settings

* Default user name will be the the same as the user name for on the system. 
* Default password is `numtel` as specified in the `defaultpw` file.
* Default database is `postgres`.
* Default port is `5432` (may be changed with `port` configuration setting).

## License

PostgreSQL
