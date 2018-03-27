"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const restService = express();

var http = require ('http');	     // For serving a basic web page.
var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.  
var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://jazz:jazzo@ds115799.mlab.com:15799/mydb';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);



mongoose.connect(uristring, function(err, db) {
  if (err) throw err;
 db.collection("powerusers").find({}, { _id: 0, age: 1 }).toArray(function(err, result) {
    if (err) throw err;
    var n = result[0].nbrejours;
restService.use(bodyParser.json());
restService.post("/echo", function(req, res) {
var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.demandeConge
      ? req.body.result.parameters.demandeConge
      : "Seems like some problem. Speak again.";
 if (req.body.result.action == 'demandeConge'){
   if (req.body.result.parameters.number == n ) 
   { 
      return res.json({
        speech: "Désolé, mais votre solde de congé est insuffisant !",
        displayText: speech,
        source: "webhook-echo-sample"
      });
  } 
  else if (req.body.result.parameters.number <= n )
{
    return res.json({
    speech: "D'accord ça marche !",
    displayText: speech,
    source: "webhook-echo-sample"
    });
}
}
  else
  {
return res.json({
  speech: "Ok, Dites moi vous voulez combien de jours exactement !",
  displayText: speech,
  source: "webhook-echo-sample"
  });
}
})

       db.close();

}); 
});
/*
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
MongoClient.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// This is the schema.  Note the types, validation and trim
// statements.  They enforce useful constraints on the data.
var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0}
});

var PUser = mongoose.model('PowerUsers', userSchema);

// Clear out old data
PUser.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: 'Doe' },
  age: 25
});

// Saving it to the database.  
johndoe.save(function (err) {if (err) console.log ('Error on save!')});
*/ 


var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

