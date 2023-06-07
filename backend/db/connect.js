const mongoose = require("mongoose")

const connectDb = async () => {
   var connected = await mongoose.connect("mongodb://0.0.0.0:27017/p-toll")
   if (connected) {
    console.log("sucessfully connected to db")
   } else {
    console.log("Failed to connect to database")
   }
}

module.exports = {
    connectDb
}