const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.connection.on('open', function () {
	console.log('The Database Add in Server At port 3001');
});
const routes = require('./routes');
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);
app.use('/image', express.static('images'));
app.listen(3001, function () {
	console.log('Port 3001 is Busy By Server');
});
