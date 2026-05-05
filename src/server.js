require("dotenv").config();
const app = require('./app')
const connectToDB = require('./config/db')
const connectCloudinary = require('./config/cloudinary')

connectToDB();
connectCloudinary();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})