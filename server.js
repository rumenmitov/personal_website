const http = require('http');
const fs = require('fs');
const path = require('path');

function send404(response) {
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.write('Error 404: Response not found!');
    response.end();
}

const mimeLookup = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css' : 'text/css',
    '.png' : 'image/png',
    '.jpg' : 'image/jpeg'
};

let server = http.createServer(function (req, res) {
    if (req.method == 'GET') {
        let fileurl;
        if (req.url == '/') fileurl = '/index.html';
        else fileurl = req.url;
        let filepath = path.resolve('./public' + fileurl)
        
        let fileExt = path.extname(filepath);
        let mimeType = mimeLookup[fileExt];
        
        if (!mimeType) {
            send404(res);
            return;
        }
        
        fs.exists(filepath, function (exists) {
            if (!exists) {
                send404(res);
                return;
            }
            
            res.writeHead(200, {'Content-Type' : mimeType});
            fs.createReadStream(filepath).pipe(res);
        })
        
        
    } else {
        send404(res);
    }
}).listen(3000);
console.log('server running on port 3000');