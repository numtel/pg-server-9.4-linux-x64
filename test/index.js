if(!('PORT' in process.env) || process.env.PORT.match(/^\d+$/) === null)
  throw new Error('PORT_ENV_VAR_REQUIRED')

if(!('DATADIR' in process.env))
  throw new Error('DATADIR_ENV_VAR_REQUIRED')

var DEBUG = false;

var port = parseInt(process.env.PORT, 10);
var dataDir = process.env.DATADIR;

var startServer = require('../');

exports.serverStartsAndStops = function(test) {
  test.expect(1);

  var postgres = startServer(dataDir, { port: port });

  DEBUG && postgres.stdout.on('data', function (data) {
    console.log('stdout: ', data.toString());
  })

  postgres.stderr.on('data', function (data) {
    DEBUG && console.log('stderr: ', data.toString());

    var ready =
      data.toString().match(/database system is ready to accept connections/);

    if(ready !== null) {
      postgres.kill();
    }
  });

  postgres.on('close', function (code) {
    test.equal(code, 0);
    test.done();
  });
}
