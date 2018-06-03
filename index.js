require('dotenv').load();

const express = require('express');
const app = express();
const http = require('http').Server(app, {
    serveClient: false
});
const io = require('./socket/index')(http);

const debug = require('debug')('Express4');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('morgan');

const config = require('./config');

const routes = require('./routes/index');

app.set('port', process.env.PORT || config.push_service.port);
app.use((req, res, next) => {
    res.io = io;
    next();
})
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

const server = http.listen(app.get('port'), ()=>{
    debug('Express server listening on port ' + server.address().port);
})