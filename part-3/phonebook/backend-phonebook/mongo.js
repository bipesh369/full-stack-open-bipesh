const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if(!password){
    console.log("Password Must be pass as an argument.")
    process.exit(1)
}

const url = `mongodb+srv://phonebookDB:${password}@cluster0.laadpbj.mongodb.net/phonebookApp?retryWrites=true&w=majority`;



 mongoose.set('strictQuery', false)

 mongoose.connect(url);

 const newSchema = new mongoose.Schema ({
   name: {
    type: String,
    required: true,
   },
   number: {
    type: String,
    required: true,
   }
 })

 const Person = mongoose.model ('person', newSchema)

 const person = new Person ({
   name: name,
   number: number
 })

 if (name && number){
  person.save()  
  .then(result => {
    console.log(`Add ${result.name} nuumber ${result.number} to the phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({ })
  .then(result =>{
    console.log("PhoneBook")
    result.forEach(p =>{
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}