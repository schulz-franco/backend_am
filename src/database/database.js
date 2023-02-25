//DONTENV
require('dotenv').config()
//Mongo
const mongoose = require('mongoose')

mongoose.set('strictQuery', false);

const connectToMongoDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("Connect to MongoDB Atlas"))
    .catch( error => console.error(error))
}

module.exports = connectToMongoDB