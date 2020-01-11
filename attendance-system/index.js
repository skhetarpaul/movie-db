const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request')
const app = express();
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors'); 
const config = require('./config/config');

const mongoURL = config.database;

mongoose.connect(mongoURL, { useNewUrlParser: true }, function(err){
    if (err) {
        console.log(err)
    } else { 
        console.log('Connect to database')
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.use(express.static('public'));

 let api = require('./app/routes/api')(app, express);
 app.use('/api',api);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
 });

 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    });
});
 
const port = config.port;

app.listen(port, function(err){
    if (err) {
        console.log(err)
    } else {
        console.log('Listening on port '+ port)
    }
});
