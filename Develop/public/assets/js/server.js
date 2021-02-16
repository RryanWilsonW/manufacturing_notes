//Requireing the modules needed to trun the program.
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const { json } = require('express');
const { stringify } = require('querystring');

//Defining the port in witch the application will run.
const PORT = process.env.PORT || 3000;
//This will create an express server for our program to run.
const app = express();

//Middleware required to parse urlencoded bodies, while looking to the request where the content-header matches the type option.
//Sets the request type to only be valid for strings and arrays.
app.use(bodyParser.urlencoded({ extended: true }));
//Joins the data back together.
app.use(bodyParser.json());

//Sets the directory default to public.
app.use(express.static(path.join(__dirname, '../../')));

//Creates a path for the index.html page.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, "../../index.html"))
});

//Creates a path for the notes html document.
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

//Sends a get request to db.json to get information.
app.get('/api/notes', function (req, res) {
    //fs.readFile('../../../db/db.JSON', 'utf8', (err, data) => {
    //res = JSON.parse(data);
    //});
    //return res;
    res.sendFile(path.join(__dirname, '../../../db/db.JSON'));
    
});

//Sends a post request to db.json to append new notes. 
app.post('/api/notes', function(req, res) {
    let notesJson;
    fs.readFile('../../../db/db.JSON', 'utf8', (err, data) => {
        notesJson = JSON.parse(data);
        notesJson.push(req.body);
        let idNum = 1;
        notesJson.forEach(note => {
            note.id = idNum;
            idNum++;
        });
    
        if(err) throw err;
        let stringJson = JSON.stringify(notesJson);
        fs.writeFile(path.join(__dirname, '../../../db', 'db.json'), stringJson, (err) => {
            if(err) throw err;
        });
    });
    res.send(req.body);
}); 

//Opens the port, and sets it to listen.
app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
});
