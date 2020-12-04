var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser")

 // Mapping the EJS template engine to ".html" files
    app.engine('html', require('ejs').renderFile);

    /*app.get('/:prov/:jueg', function(req,res) {
      res.render(__dirname + '/views/index.html');
     });*/

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');

      // authorized headers for preflight requests
      // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();

      app.options('*', (req, res) => {
          // allowed XHR methods  
          res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
          res.send();
      });
    });

const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
