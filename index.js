const express=require("express");
const app=express();
const path=require("path")
const methodOverride = require('method-override');
const port=3000;
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let user=[
    "cats",
    "buffalo",
    "elephant",
    "cow",
    "dogs",
    "tiger",
    "parrot",
    "lion",
    "owl",
    "peacock"
  ]
  const data=require("./data.json");
  const random=[data[user[Math.floor(Math.random()*user.length)]],data[user[Math.floor(Math.random()*user.length)]],data[user[Math.floor(Math.random()*user.length)]],data[user[Math.floor(Math.random()*user.length)]]]
app.get("/home",(req,res)=>{
    res.render("index.ejs",{random});
})
app.get("/:user",(req,res)=>{
    let {user}=req.params;
    instadata=data[user];
    if(instadata){
        res.render("show.ejs",{instadata});
    }else{
        res.render("error.ejs");
    }
    
})
app.get("/:user/edit",(req,res)=>{
    let {user}=req.params;
    instadata=data[user];
    res.render("edit.ejs",{instadata});
})
app.patch("/:user",(req,res)=>{
    let {user}=req.params;
    console.log(req.body);
    let {username,bio}=req.body;
    let instadata=data[user];
    if(instadata){
        instadata.name=username;
        instadata.bio=bio;
        if(username && username!==user){
            data[username]=data[user];
            delete data[user];
            res.redirect(`/${username}`);
        }else {
            res.redirect(`/${user}`);     
        }
    }else {
        res.status(404).send("User not found");
    }
    
})
app.get("/",(req,res)=>{
    res.redirect("/home");
})
app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})
