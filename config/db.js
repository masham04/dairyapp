const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://masham1234:masham1234@cluster1.jvnso.mongodb.net/DiaryApp?retryWrites=true&w=majority"
        ,{
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