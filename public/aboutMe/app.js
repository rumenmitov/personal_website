const express = require('express'),
    bodyParser = require('body-parser'),
    https = require('https');
    cors = require('cors');
    nodemailer = require('nodemailer');
const fs = require('fs');

let sslOptions = { key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem') };

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "rumenchopriv@gmail.com",
        pass: "dfhmfmwiqapknzek"
    }
});

let router = express.Router();
    router.use(bodyParser.urlencoded({ extended: true }));
    router.route('/')
        .post((req, res, next)=>{

            let writeUserResponse = fs.createWriteStream(__dirname + `/userResponses/userResponse_${(new Date()).getTime()}.txt`, { flags: 'a' });
            writeUserResponse.write("User's name: " + req.body.username + '\n\n');
            writeUserResponse.write("User's email: " + req.body.email + '\n\n');
            writeUserResponse.write("User's comment:\n-----\n" + req.body.comment + '\n-----\n\n');
            writeUserResponse.write("User's IP address: " + req.ip + '\n\n');
            writeUserResponse.write("---EOF---");

            next();
        });
let app = express()
    .use(cors())
    .use('/comment', router)
    .use((req, res, next)=>{
        if (req.body.comment) {
            let emailDetails = {
                from: "rumenchopriv@gmail.com",
                to: "rumenchopriv@gmail.com",
                subject: "New comment on website",
                text: `User's name: ${req.body.username}\n\nUser's email: ${req.body.email}\n\nUser's comment:\n-----\n${req.body.comment}\n-----\n\nUser's IP address: ${req.ip}\n\n---EOF---`
            };
            mailTransporter.sendMail(emailDetails, (err)=>{
                if (err) console.log(err);
                else console.log('email sent');
            });

        }
        next();
    })
    .use((req, res)=>{
        const portOfServer = 3000;
        const successPageUrl = `\'http://192.168.178.86:${portOfServer}/aboutMe/commentSuccess/commentSuccess.html\'`;
        res.send(`<script defer> location.href = ${successPageUrl}; </script>`);
    });

https.createServer(sslOptions, app)
    .listen(3100); 

console.log('listening on port 3100');
