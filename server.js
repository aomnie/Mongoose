const express = require("express");
const mongoose = require("mongoose");
const Person = require("./Person");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});

//Create and Save a Record of a Model

let createAndSavePerson = (done) => {
  let Marwen = new Person({
    name: "Marwen",
    age: 34,
    favoriteFoods: ["ma9loub", "kafteji"],
  });
  Marwen.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

//Create many records with model

let arrayOfPeople = [
  { name: "Pablo", age: 24, favoriteFoods: ["Ma9rouna"] },
  { name: "kaloutcha", age: 46, favoriteFoods: ["Mar9et batata"] },
  { name: "Rab3oun", age: 40, favoriteFoods: ["Fries"] },
];

let createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.log(err);
    done(null, people);
  });
};

//Using model.find() to Search in the Database

let findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

//Using model.findOne() to Return a Single Matching Document from the DB
let findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

//Using model.findById() to Search from the  DB By _id

let findPersonById = (id, done) => {
  Person.findById(id, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

//Performing Classic Updates by Running Find, Edit, then Save

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // findById() method to find a person by  his id
  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    // Array.push() method to add "hamburger" to the list of the that person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

//Performing New Updates on a Document Using model.findOneAndUpdate()

const findAndUpdate = (personName, done) => {
  const agemod = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: agemod },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

//Deleting a Document Using model.findByIdAndRemove

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

//Deleting Many Documents with model.remove()

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, (err, response) => {
    if (err) return console.log(err);
    done(null, response);
  });
};

//Chain Search Query Helpers

const queryChain = (done) => {
  var foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
};
