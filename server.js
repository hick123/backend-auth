var mysql = require('mysql');
const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var myConnection = require('express-myconnection')
var morgan = require('morgan');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./Routes/auth.routes');
const memberRoutes = require('./Routes/member.route');
const groupRoutes = require('./Routes/group.route');
const clustersRoutes = require('./Routes/clusters.routes');
const eventsRoutes = require('./Routes/events.routes');
const contributionRoutes= require('./Routes/contribution.route')

// const authMiddleware = require('./Middlewares/auth');


app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());
app.use(express.json());
// app.use(jwt);
// app.use(jwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/login']}));
// var conn = mysql.createConnection({
//   host: "remotemysql.com",
//   user: "EDNJyikTgf",
//   password: "2kNR45e4Zq",
//   database : 'EDNJyikTgf'
// });

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'ack'
});
// var conn = mysql.createConnection({
//   host: "teqworthsystems.com",
//   user: "teqworth_ack",
//   password: "teqworth_ack",
//   database : 'teqworth_ack'
// });

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   });
//   global.conn = conn;
var connectWithRetry = async function() {
  conn.connect(function(err) {
  // if (err) throw err;
  // console.log("Connected!");
  // });
    if (err) {
      console.error('Failed to connect to db on startup - retrying in 1 sec', err);
      setTimeout(connectWithRetry, 1000);
    }
      console.log("Connected!");

    global.conn = conn;
  });
};
connectWithRetry();
  //routes
  app.use('/auth',authRoutes)
  app.use('/members', memberRoutes);
  app.use('/groups',groupRoutes);
  app.use('/clusters', clustersRoutes);
  app.use('/events', eventsRoutes);
  app.use('/contribution',contributionRoutes);

app.listen(port, () => console.log(`Auth app listening on port ${port}!`))
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });
// exports.app = functions.https.onRequest(app);
