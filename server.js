const fs = require('fs'),
    express = require('express'),
    http = require('http'),
    https = require('https'),
    colors = require('colors');

const sslCredentials = {
    key: fs.readFileSync(__dirname + '/sslCert/key.pem'),
    cert: fs.readFileSync(__dirname + '/sslCert/cert.pem')
}

let app = express()
.use(express.static(__dirname + '/public'));

http.createServer((req, res)=>{
    res.setHeader(301, { 'Location': 'https://rumenmitov.tk' });
})
.listen(80);

https.createServer(sslCredentials, app).listen(443);

console.clear();
console.log('Server running on ports 80 and 443 ✔\n'.green);
console.log('Website: https://rumenmitov.tk ⭐\n\n'.yellow);
console.log('---------------------------------\n\n');