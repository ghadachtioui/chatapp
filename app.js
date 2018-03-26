"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
    return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/audio", function(req, res) {
  var speech = "";
  switch (req.body.result.resolvedQuery) {
    //Speech Synthesis Markup Language 
    case "bjour":
      speech =
        'nnn';
      break;
    case "music two":
      speech =
        '<speak><audio clipBegin="1s" clipEnd="3s" src="https://actions.google.com/sounds/v1/cartoon/slide_whistle.ogg">did not get your audio file</audio></speak>';
      break;
        }
  return res.json({
    req.body.result.fulfillment.speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

//
// Preamble
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

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
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

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'PowerUsers' collection in the MongoDB database
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

// Creating more users manually
var janedoe = new PUser ({
  name: { first: 'Jane', last: 'Doe' },
  age: 65
});
janedoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var alicesmith = new PUser ({
  name: { first: 'Alice', last: 'Smith' },
  age: 45
});
alicesmith.save(function (err) {if (err) console.log ('Error on save!')});


// In case the browser connects before the database is connected, the
// user will see this message.
var found = ['DB Connection not yet established.  Try again later.  Check the console output for error messages if this persists.'];

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});



