var express = require( 'express' ),
 routes = require('./routes'),
 engine = require('ejs-locals')
 app = express();
 ;
 
// Configuration
// remove methodOverride, add favicon, logger and move static middleware upper

app.configure( function (){
  app.engine('ejs', engine);
  app.set( 'views', __dirname + '/views' );
  app.set( 'view engine', 'ejs' );
  app.use( express.favicon());
  app.use( express.static( __dirname + '/public' ));
  app.use( express.logger());
  app.use( express.bodyParser());
  app.use( app.router );
});
 
app.configure( 'development', function (){
  app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});
 
app.configure( 'production', function (){
  app.use( express.errorHandler());
});
 
// Routes
var routes = require( './routes' );

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
 
var server = app.listen( 3000);

  console.log( 'Express server listening on port %d in %s mode', server.address().port, app.settings.env );