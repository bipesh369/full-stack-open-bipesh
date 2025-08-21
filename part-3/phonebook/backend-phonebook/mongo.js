const mongoose = require('mongoose')

const passWord = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if(!passWord){
    console.log("Password Must be pass as an argument.");
    process.exit(1);
}

const uri = `mongodb+srv://sudeeep32:${passWord}@cluster0.dqf2ndm.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery',false)

mongoose.connect(uri);

const newSchema = new mongoose.Schema ({
name:{
    type: String,
    required: true,
},
number: {
    type: String,
    required: true,
}
})


const Person = mongoose.model('Person',newSchema)

const  person = new Person ({
     name: name,
     number: number,
})

if(name && number){
    
person.save()
.then(result =>{
    console.log(`added ${result.name} number ${result.number} to the phonebook`)
    mongoose.connection.close()
})
}
else {
    Person.find({ })
    .then(result=>{
        console.log("Phone book:");
        result.forEach(p=>{
            console.log(`${p.name} ${p.number}`)
        })
   
   mongoose.connection.close()
    })

}