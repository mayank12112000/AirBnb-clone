const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const path = require("path")
const MONGO_URL = process.env.MONGO_URL ||  'mongodb://127.0.0.1:27017/wanderlust';

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

async function main(){
    await mongoose.connect(MONGO_URL)
}
main()
.then(res=>console.log("connection established with mongo db"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
    res.send("hi i am root")
})

app.listen(port,()=>{
    console.log("server is listening to:",port)
})

app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
})
// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new villa",
//         price:"2000",
//         description:"by the bay",
//         location:"Beohari",
//         country:"India"
//     })
//     await sampleListing.save()
//     console.log("sample was saved")
//     res.send("successfull")
// })