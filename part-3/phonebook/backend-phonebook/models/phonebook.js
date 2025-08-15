const mongoose = require('mongoose')


const Url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(Url)
.then(res=>{
  console.log("connected Mongodb")
})
.catch(err=>{
  console.log("Error:",err.message)
});

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

module.exports =  mongoose.model('Persons',newSchema)
