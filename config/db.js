const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:personaldiary_db",{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message} mongodb connection failed`)
        process.exit(1);
    }
}
module.exports = connectDB;