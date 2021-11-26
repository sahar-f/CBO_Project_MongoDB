/**
 * Sahar Fatima
 * Simple Charity Website
 */

'use strict';

 // load packages
const path = require("path")
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Event = require('./models/events');
const Person = require('./models/person');
const EventToPerson = require('./models/eventToPerson');
const Increment = require('./models/increment');
//const autoIncrement = require('mongoose-auto-increment');

//connect to mongodb
const dbURI='mongodb+srv://sahar:CMPT353@cluster0.eybqi.mongodb.net/charitydb?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log);

// port and host addresses 
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

//express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", express.static(__dirname + '/views'));

/*********************************************************** */
var pid = 0;
var eid = 0;
var oid="619fcd46d3f710aaa96e3933";
Increment.find({_id:oid})
        .then((results) => {
          pid = results[0].pid;
          eid = results[0].eid;;
        })
        .catch((err)=>{
          console.log(err)
});  

var temp = Increment.find({"_id":"ObjectId(oid)"});

/**
* Get function to diplay the home.html on the home page 
*/
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/views/home.html');
});

/**************************************EVENTS API**************************************** */
// Get all Events
app.get('/events', function (req, res) {
  Event.find()
  .then((results) => {
    res.send(JSON.stringify(results))
  })
  .catch((err)=>{
    console.log(err)
  });  
})

// Get event by id
app.get('/event/:id', function (req, res) {
  var i = req.params.id;

  if(!i || isNaN(i)){
    res.status(404).send();
  }else{
    Event.find({id:req.params.id})
        .then((results) => {
          res.send(JSON.stringify(results))
        })
        .catch((err)=>{
          console.log(err)
      });  
  }
})

// Register an Event
app.post('/addEvent', function (req, res) {
  var Name = req.body.Name;
  var Location = req.body.Location;
  var Date = req.body.Date;
  var Details = req.body.Details;
  var MaxCapacity = req.body.MaxCapacity;

  // if required parameters not found then send an error response 
  if(!Name || !Location || !Date || !MaxCapacity || isNaN(MaxCapacity)){
    res.status(404).send();
  }else{
    var i = ++eid;

    const event = new Event({
      id: i,
      Name: req.body.Name,
      Location: req.body.Location,
      Date: req.body.Date,
      Details: req.body.Details,
      MaxCapacity: req.body.MaxCapacity
    });
    event.save()
      .then((results) => {
        Increment.findOneAndReplace({_id:oid},{eid:i})
        .then((results) => {
          res.send("done")
        })
        .catch((err)=>{
          console.log(err)
        });  
      })
      .catch((err)=>{
        console.log(err);
        eid--;
      });
  }
})

//Update an Event
app.put('/updateEvent', function (req, res) {
  var Name = req.body.Name;
  var Location = req.body.Location;
  var Date = req.body.Date;
  var Details = req.body.Details;
  var MaxCapacity = req.body.MaxCapacity;
  var id = req.body.id;

  if(id != '' && isNaN(id) || MaxCapacity != '' && isNaN(MaxCapacity)){
    res.status(404).send();
  }else{
    if(Name)
    {
      Event.findOneAndUpdate({id: req.body.id},{
        Name:req.body.Name
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(Location)
    {
      Event.findOneAndUpdate({id: req.body.id},{
        Location:req.body.Location
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(Date)
    {
      Event.findOneAndUpdate({id: req.body.id},{
        Date:req.body.Date
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(Details)
    {
      Event.findOneAndUpdate({id: req.body.id},{
        Details:req.body.Details
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(MaxCapacity && !isNaN(MaxCapacity))
    {
      Event.findOneAndUpdate({id: req.body.id},{
        MaxCapacity:req.body.MaxCapacity
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }     
  } 
})

//Delete Event 
app.delete('/deleteEvent/:id', function (req, res) {
  var i = req.params.id;
   
  if(!i || isNaN(i)){
    res.status(404).send();
  }else{
    EventToPerson.deleteMany({eventId: i})
    .then((results) => {
      Event.findOneAndDelete({id: i})
      .then((results) => {
        res.send(`Delete Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    })
    .catch((err)=>{
      console.log(err)
    });
  }
})

/**************************************PEOPLE API**************************************** */
// Get all People
app.get('/people', function (req, res) {
  Person.find()
  .then((results) => {
    res.send(JSON.stringify(results))
  })
  .catch((err)=>{
    console.log(err)
  });  
})

// Get person by id
app.get('/people/:id', function (req, res) {
  var i = req.params.id;

  if(!i || isNaN(i)){
    res.status(404).send();
  }else{
    Person.find({id:req.params.id})
        .then((results) => {
          res.send(JSON.stringify(results))
        })
        .catch((err)=>{
          console.log(err)
      });  
  }
})

// Register a Person  
app.post('/addPerson', function (req, res) {
  var LastName = req.body.LastName;
  var FirstName = req.body.FirstName;
  var Age = req.body.Age;
  var FamilySize = req.body.FamilySize; 
  var DietRestrictions = req.body.DietRestrictions;

   // if required parameters not found then send an error response 
  if(!LastName || !FirstName || !Age || !FamilySize || isNaN(Age) || isNaN(FamilySize)){
    res.status(404).send();
  }
  else{
    var i = ++pid;

    const person = new Person({
      id: i,
      LastName:req.body.LastName,
      FirstName:req.body.FirstName,
      Age:req.body.Age,
      FamilySize:req.body.FamilySize,
      DietRestrictions:req.body.DietRestrictions
    });
    person.save()
      .then((results) => {
        Increment.findOneAndReplace({_id:oid},{pid:i})
        .then((results) => {
          res.send("done")
        })
        .catch((err)=>{
          console.log(err)
        }); 
      })
      .catch((err)=>{
        console.log(err)
        pid--;
      });
  }
}) 

//Update a Person
app.put('/updatePerson', function (req, res) {
  var LastName = req.body.LastName;
  var FirstName = req.body.FirstName;
  var Age = req.body.Age;
  var FamilySize = req.body.FamilySize;
  var DietRestrictions = req.body.DietRestrictions;
  var id = req.body.id;
   
  if(id != '' && isNaN(id) || Age != '' && isNaN(Age) || FamilySize != '' && isNaN(FamilySize)){
    res.status(404).send();
  }   
  else{
    if(LastName)
    {
      Person.findOneAndUpdate({id: req.body.id},{
        LastName:req.body.LastName
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(FirstName)
    {
      Person.findOneAndUpdate({id: req.body.id},{
        FirstName:req.body.FirstName
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }

    if(Age && !isNaN(Age))
    {
      Person.findOneAndUpdate({id: req.body.id},{
        Age:req.body.Age
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }  

    if(FamilySize && !isNaN(FamilySize))
    {
      Person.findOneAndUpdate({id: req.body.id},{
        FamilySize:req.body.FamilySize
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }  

    if(DietRestrictions)
    {
      Person.findOneAndUpdate({id: req.body.id},{
        DietRestrictions:req.body.DietRestrictions
      })
      .then((results) => {
        res.send(`Update Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    }
  }
})

//Delete Person 
app.delete('/deletePerson/:id', function (req, res) {
  var i = req.params.id;
  
  if(!i || isNaN(i)){
    res.status(404).send();
  }else{
    EventToPerson.deleteMany({personId: i})
    .then((results) => {
      Person.findOneAndDelete({id: i})
      .then((results) => {
        res.send(`Delete Completed`)
      })
      .catch((err)=>{
        console.log(err)
      });
    })
    .catch((err)=>{
      console.log(err)
    });
  }
}) 
/*********************Register person for event ******************************/
//Register Person for Event
app.post('/addPersonForEvent', function (req, res) {
  var ei = req.body.eventId;
  var pi = req.body.personId;

  if(!ei || isNaN(ei) || !pi || isNaN(pi)){
    res.status(404).send();
  }   
  else{
    var found;
    EventToPerson.find({eventId:ei,personId:pi})
        .then((results) => {
          found=JSON.parse(JSON.stringify(results));
        })
        .catch((err)=>{
          console.log(err)
      });  

    var count=0;
    for (let x in found) {
      count++;
    }

    if(count == 0)
    {
      const eventToPeople = new EventToPerson({
        eventId: ei,
        personId: pi,
      });

      eventToPeople.save()
      .then((results) => {
        res.send(results)
      })
      .catch((err)=>{
        console.log(err)
      });
    }
    
  }  
})  

//Return max cap for an event.
app.get('/maxCap/:id', function (req, res) {
  var ei = req.params.id;
  var found;

  if(!ei || isNaN(ei)){  
    res.status(404).send(); 
  }else{
    Event.find({id:ei})
        .then((results) => {
          found=JSON.stringify(results);
          if(found == ''){
            res.status(500).send();
          }else{
            res.send(found);
          }
        })
        .catch((err)=>{
          console.log(err)
      });  
  } 
});


//Return all people who are attending an event 
app.get('/attending_event/:id', function (req, res) {
  var ei = req.params.id;
  var found;

  if(!ei || isNaN(ei)){
    res.status(404).send();
  }else{
    EventToPerson.find({eventId:ei})
        .then((results) => {
          if(results == '' || !results)
          {
            res.status(500).send();
          }else
            res.send(JSON.stringify(results));
        })
        .catch((err)=>{
          console.log(err)
      });
  }   
}) 

//without error catching for registering person to event
app.get('/attending_event_2/:id', function (req, res) {
  var ei = req.params.id;

  if(!ei || isNaN(ei)){
    res.status(404).send();
  }else{
    EventToPerson.find({eventId:ei})
        .then((results) => {
          res.send(JSON.stringify(results));
        })
        .catch((err)=>{
          console.log(err)
      });
  }   
}) 
    
// // return all the events a person is attending
app.get('/attending_person/:id', function (req, res) {
  var pi = req.params.id;

  if(!pi || isNaN(pi)){
    res.status(404).send();
  }else{
    EventToPerson.find({personId:pi})
    .then((results) => {
      if(results == '' || !results)
      {
        res.status(500).send();
      }else
        res.send(JSON.stringify(results));
    })
    .catch((err)=>{
      console.log(err)
    });
  } 
})

app.listen(PORT)

console.log("listening on port 8080")

