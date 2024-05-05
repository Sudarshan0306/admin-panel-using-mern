const mongoose = require('mongoose');

// mongoose.connect(URI);

//connection to DB
const URI = process.env.MONGODB_URI
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connection successful");
    } catch (error) {
        console.log("Database connection failed");
    }
};

module.exports = connectDb;
