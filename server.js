// Get dependencies
const express       = require('express'),
      exphbs        = require('express-handlebars'),
      hbsHelpers    = require('handlebars-helpers'),
      hbsLayouts    = require('handlebars-layouts'),
      path          = require('path'),
      bodyParser    = require('body-parser'),
      session       = require('express-session'),
      csrf          = require('csurf'),
      errorhandler  = require('errorhandler'),
      morgan        = require('morgan'),
      favicon       = require('serve-favicon'),
      
    // database     = require('./lib/database'),
    // seeder       = require('./lib/dbSeeder'),
      router        = require('./server/routes/router'),
      app           = express(),
      port          = '3000';

class Server {

  constructor()  {
    this.initViewEngine();
    this.initExpressMiddleware();
    this.initCustomMiddlware();
    this.initDbSeeder();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(port, (err) => {
      console.log(`API running on http://localhost:${port}`);
    })
  }

  initViewEngine() {
    const hbs = exphbs.create({
      extname: '.hbs',
      defaultLayout: 'master'
    });
    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');
    hbsLayouts.register(hbs.handlebars, {});
  }

  initExpressMiddleware() {
    app.use(favicon(__dirname + '/dist/favicon.ico'));
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
      secret: 'zigzock05',
      saveUninitialized: true,
      resave: true })
    );
    app.use(errorhandler());
    app.use(csrf());

    app.use(function (req, res, next) {
      res.locals._csrf = req.csrfToken();
      next();
    });

    process.on('uncaughtException', function (err) {
      if (err) console.log(err, err.stack);
    });
  }

  initCustomMiddlware() {}

  initDbSeeder() {}

  initRoutes() {
    //router.load(app, './server/controllers');

    // redirect all others to the index (HTML5 history)
    app.all('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    })
  }
}

var server = new Server();