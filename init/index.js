const mongoose = require("mongoose")
const initData = require("./data")
const Listing = require("../models/listing")

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'

async function main(){
    await mongoose.connect(MONGO_URL)
}

main()
.then(res=>console.log("connection established"))
.catch(err=>console.log("error encountered:",err))

const initDB = async()=>{
    await Listing.deleteMany({})
    await Listing.insertMany(initData.data)
    console.log("data was initialized")
}
initDB()