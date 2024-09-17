const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const Listing = require("./models/listing")
const methodOverride = require("method-override")
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs")

const ejsmate= require("ejs-mate")
app.engine("ejs",ejsmate)

const path = require("path")
app.use(express.static(path.join(__dirname, "/public")));
app.set("views",path.join(__dirname,"views"))

const MONGO_URL = process.env.MONGO_URL ||  'mongodb://127.0.0.1:27017/wanderlust';


async function main(){
    await mongoose.connect(MONGO_URL)
}
main()
.then(res=>console.log("connection established with mongo db"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
    res.send("hi i am root")
})

app.listen(port,"0.0.0.0",()=>{
    console.log("server is listening to:",port)
})

app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find()
    res.render("listings/index.ejs",{allListings})
    const url = app.url
})
// new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
})

// show route
app.get("/listings/:id", async(req,res)=>{
    const {id} = req.params
    console.log(id)
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs",{listing})
})

// create route
app.post("/listings", async(req,res)=>{
    const newListing = new Listing(req.body)
    newListing.save()
    res.redirect("/listings")
})

// edit route
app.get("/listings/:id/edit",async (req,res)=>{
    const {id} = req.params
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs",{listing})
})
// update route

app.put("/listings/:id", async (req, res) => {
    const {id} = req.params
    console.log(req.body)
    const listing = await Listing.findByIdAndUpdate(id,{...req.body})
    res.redirect(`/listings/${id}`)

})

// delete route
app.delete("/listings/:id/delete",async(req,res)=>{
    const {id} = req.params
    console.log("delete req send")
    const listing = await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})