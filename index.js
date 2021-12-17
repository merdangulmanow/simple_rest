require('dotenv').config()
const cookieParser = require('cookie-parser')
const sequelize = require('./db');
const cors = require('cors')
const fileUpload = require("express-fileupload")
const router = require('./routes/index')
const path = require('path')
const helmet = require('helmet');
const express = require('express');
const app = express();


const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

/// app uses
app.use(cors())
app.options('*', cors());
app.use(cors({ origin: true }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(fileUpload({}))
app.disable("x-powered-by")


app.use(helmet())
app.use(helmet.hidePoweredBy());
app.use(helmet({ crossOriginOpenerPolicy: true }));
app.use(helmet.contentSecurityPolicy({useDefaults: true, directives: { "script-src": ["'self'", "securecoding.com"],"style-src": null,}}));
app.use(helmet.expectCt({maxAge: 96400, enforce: true, reportUri:"https://google.com",}));
app.use(helmet.dnsPrefetchControl({allow: true,}));
app.use(helmet.frameguard({action: "deny",}));
app.use(helmet.hsts({maxAge: 123456, includeSubDomains: false,}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.referrerPolicy({policy: ["origin", "unsafe-url"],}));
app.use(helmet.xssFilter());


const start = async () => {
  try{
      await sequelize.authenticate()
      await sequelize.sync()

      app.use(function(req, res, next) {
        req.io = io;
        next();
      });
      app.use('/api', router);
      app.get('/new_message', function(req, res) {
        req.io.emit('new_message', {data:"new message for client"})
        res.json({message:"Hello wordl!"})
      });

    io.on('connect', onConnect);
    server.listen(PORT, () => console.log('server listening on port ' + PORT));

    //// socket 
    async function onConnect(socket){
      socket.on('message', function(data){
        console.log("message from client");
        console.log(data);
      })



    }
  } catch(err){
    console.log(err)
  }
}

start()