const mongoose = require('mongoose');

async function connectToDB() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully")
    } catch(err) {
        console.log("Databse connection error : ")
        console.log(err);
    }
}

module.exports = connectToDB;