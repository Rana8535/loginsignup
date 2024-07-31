const express= require('express');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const PORT=5000;
const app=express();

// mongodb ka url
const MONGO_URL='mongodb+srv://Ankur321:ankur123@cluster0.auigiqt.mongodb.net/loginsignup?retryWrites=true&w=majority&appName=Cluster0';

// middleware
app.use(cors());
app.use(express.json());

// mongodb ko connect krna
mongoose.connect(MONGO_URL);
const db=mongoose.connection;
//agr connection mei koi error hai to error show krde
db.on('error',(err)=>{
    console.error("mongodb connection error",err);
})

db.once('open',()=>{
    console.log("mongodb connected successfully");
})

//now we design the schema
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String
    }
});
const User=mongoose.model('User',userschema);
app.post('/register',async(req,res)=>{
    const {name,email,password,cpassword}=req.body;
    const user=await User.findOne({email:email});
    if(name=="" || email=="" || password=="" || cpassword==""){
        res.json("");
    }
    if(user){
        res.json("exist");
    }
    else if(password != cpassword){
       res.json("mismatched");
    }
    else{
        try{
            const hash=await bcrypt.hash(password,10);
            const newuser=new User({
                name:name,
                email:email,
                password:hash,
            })
            await newuser.save();
            res.json("registered")
            
        }
        catch(err){
            console.error("error during registration",err);
            res.status(500).json({err: "internal server error"});
        }
    }
});

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user){
            res.json("invalid email");
        }
        const ismatch=await bcrypt.compare(password, user.password);
        if(!ismatch){
            res.json("password mismatch");
        }
        else{
            res.json("exist");
        }
    }
    catch(err){
        console.error("error during login",err);
    }
})




app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

