const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/router');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);
app.use(express.static(path.join(__dirname , './client/build')));
app.get('*' , (req , res) => {
    res.sendFile(path.join(__dirname , './client/build/index.html'));
});

app.listen(PORT , () => {
    console.log('starting server...');
});