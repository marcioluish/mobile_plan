const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const server = http.createServer(app);

const userRoutes = require('./routes/user');
const planRoutes = require('./routes/plan');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs', 'access.log'),
    { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/plan', planRoutes);

mongoose.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mplan_db:27017?authSource=admin`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error('failed to connect to DB');
            console.error(err);
        } else {
            console.log('connected to DB');
            server.listen(8000);
        }
    }
);
