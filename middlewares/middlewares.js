const express = require("express")
const app = express()
const port = 3030
app.listen(port,(req,res)=>{
    console.log("server is running on:",port)
})
// app.use(()=>{
//     console.log("it is a middleware applicable for all routes")
// })
app.use("/random",(req,res,next)=>{
    console.log("i am only for random")
    next()
})

// we can pass multiple middleware
const checkToken = (req,res,next)=>{
    let {token} = req.query
    if(token === "giveaccess"){
        next()
    } 
    res.send("access denied")
}
app.use("/api",checkToken,(req,res,next)=>{
    res.send("data")
})
app.get("/",(req,res)=>{
    res.send("hi, i am root")
})

app.get("/random",(req,res)=>{
    res.send("this is random page")
})
app.use((req,res,next)=>{ // middleware used as logger
    req.time = Date.now()
    console.log(req.method,req.hostname,req.path,req.time)
    next()
})
app.use((req,res,net)=>{
    res.status(404).send("not found")
})