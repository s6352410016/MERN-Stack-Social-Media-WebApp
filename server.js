const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/router');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.static(path.join(__dirname , './client/build')));
app.get('*' , (req , res , next) => {
    res.sendFile(path.join(__dirname , './client/build/index.html'));
    next();
});
app.use(router);

mongoose.connect(process.env.DATABASE , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT , () => {
        console.log('Connecting to database and starting server...');
    });
}).catch((err) => {
    console.log(err);
});