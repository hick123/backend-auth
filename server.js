var mysql = require('mysql');
const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var myConnection = require('express-myconnection')
var morgan = require('morgan');
var cors = require('cors');
const app = express();
const port = 3000;

const memberRoutes = require('./Routes/member.route');
const groupRoutes = require('./Routes/group.route');
const clustersRoutes = require('./Routes/clusters.routes');
const eventsRoutes = require('./Routes/events.routes');

app.use(cors(
  {
    origin: 'localhost:4200'

  }
));
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

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : 'ack'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });
  global.conn = conn;
  //routes
  app.use('/', memberRoutes);
  app.use('/groups', groupRoutes);
  app.use('/clusters', clustersRoutes);
  app.use('/events', eventsRoutes);

app.listen(port, () => console.log(`Auth app listening on port ${port}!`))