const path = require('path');
var express = require("express");
var db = require('./config/db.js');

db();

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json({ extended: false }));

// Routes

app.use('/stories', require('./routes/stories'));
app.use('/users', require('./routes/users'));

// Starting the server, syncing our models ------------------------------------/
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers");
  next();
});

if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

app.listen(PORT, () => 
  console.log("Listening")
)




