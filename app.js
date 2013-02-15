
// Node includes
var restify = require('restify'),
    app = restify.createServer(),
    config = require('./config'),
    mongoose = require('mongoose/');

// Takes care of turning your request data into a
// JavaScript object on the server automatically
app.use( restify.bodyParser() );

// Instantiate connection to Mongo
db = mongoose.connect( config.creds.mongoose_auth );

// Alias schema (not necessary)
Schema = mongoose.Schema;

// Create a new user schema
UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    age: Number
});

// Register the schema with Mongoose
mongoose.model( 'User', UserSchema );


// Sample endpoint
app.get('/foo/:param', function( req, res, next) {
    res.send( 'heyo, ' + req.params.param );
});

// List all users example
app.get('/users', function( req, res, next ) {
    var User = db.model('User');
    User.find().execFind( function( arr, data ) {
        res.send( data );
    });
});

// Start the server
app.listen( 8080, function() {
    console.log( 'Restify (Test) | %s listening at %s', app.name, app.url );
});