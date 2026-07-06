const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
// app.use(express.static(path.join(__dirname,"/public")));
app.use(express.static(path.join(__dirname,"/public/js")));//if [public ke andar folders
app.use(express.static(path.join(__dirname,"/public/css")));
const port=3000;

app.get("/ig/:username",(req,res)=>{
    // console.log(req.params);
    let {username}=req.params;
    const data=require("./data.json");
    // console.log(data);
    const instadata=data[username];
    // console.log(instadata)
    if(instadata){
        res.render("insta",{instadata});
    }else{
        res.render("error");
    }
    
})
app.listen(port,()=>{
    console.log(`port started at port : ${port}`);
})