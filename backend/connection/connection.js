const mongoose = require("mongoose")
require("dotenv").config();
const connection = async()=>{
    try {
        await mongoose.connect(process.env.DB).then(()=>{
            console.log("connected database")
        })
    } catch (error) {
        console.log(error);
    }
}
connection();