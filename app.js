var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var times = require('./routes/network');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //Icon on the tab on the browser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Directory to serve

app.use('/', routes);
app.use('/users', users); // Not used

/* POST to get the bandwidth on the client side */
app.post('/speed', function (req, res) {
    console.log(req.body);
    console.log(req.body.speed);
    res.end('yes');
});
/* POST to ask for the server timestamp to measure the latency */
app.post('/timestamp', function (req, res, next) {
    var json = '{'
        + '"timestamp" : ' + (new Date()).getTime()
        + '}';
    res.send(JSON.parse(json));
});
/* POST timestamp to measure latency */
app.post('/measure_latency', function (req, res) {
    console.log(req.body);
    var inte =  req.body.value2 - req.body.value1;
    console.log("Latency = " + inte);
    res.end('yes');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err //change to the following statement on production
        //error: {}
    });
});


module.exports = app;
