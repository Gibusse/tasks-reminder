var express = require('express'),
        path = require('path'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        api = require('./controllers/mainController');

var port = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/api', api);



app.listen(port, function() {
    console.log('Listening on Port :' + port);
});