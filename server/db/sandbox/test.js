const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

// Schema
const kittySchema = new mongoose.Schema({
  name: String
})

// Schema method
kittySchema.methods.speak = function() {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : "I don't have a name"
  console.log(greeting)
}

// Model - a class that we use to construct documents
const Kitten = mongoose.model('Kitten', kittySchema)

// Document
const silence = new Kitten({
  name: 'Silence'
})
console.log("Silence's name:", silence.name)

let fluffy = new Kitten({name: 'fluffy'})
fluffy.speak()

fluffy.save(function(err, fluffy) {
  if (err) return console.error(err)
  console.log('In the save method call:')
  fluffy.speak()
})

Kitten.find(function(err, kittens) {
  if (err) return console.error(err)
  console.log('All of our kittens:', kittens)
})

Kitten.find({name: /^fluff/}, function(err, foundKittens) {
  if (err) return console.error(err)
  console.log('Found kitten:', foundKittens)
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("We're connected!")
})
// code placed here is unreachable
