const fs = require('fs');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../index.html'));
});


app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
})