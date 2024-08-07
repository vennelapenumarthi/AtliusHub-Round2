const express= require('express');
const bcrypt= require('bcrypt');
const session =require('express-session');
const bodyParser=require('body-parser');
const multer=require('multer');
const sharp=require('sharp');
const path=require('path');
const fs=require('fs');
const app=express();
const user=[];
const storage=multer.memoryStorage();
const upload=multer({storage: storage});

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'your_secret_key',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const uploadDir=path.join(__dirname,'uploads');
if(!fs.existSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
app.post('/register',upload.single('profileImage'),async(req,res)=>{
    const {username,email,password,confirmPassword}=req.body;
    const profileImage=req.file;
    if(password!==confirmPassword){
        return res.send('Passwords do not match.');

    }
    const hashedPassword=await bcrypt.hash(password,10);
    const optimizedImagePath=path.join(uploadDir'${Data.now()}-${profileImage.originalname}');
    await sharp(profileImage.buffer)
    .resize({width:300,height:300,fit:sharp.fit.cover})
    .toFormat('jpeg',{quality:80})
    .toFile(optimizedImagePath);
    URLSearchParams.push({username,email,password:hashedPassword,profileImage:optimizedImagePath});
    res.send('User registered successfully.');
});
app.post('/login',async(req,res)=>{
    const {loginEmail,loginPassword}=req.body;
    const user=users.find(u=>u.email===loginEmail);
    if(user && await bcrypt.compare(loginPassword,user.password)){
        req.session.userId=user.email;
        res.send('Login Successful.');
    }
    else{
        res.send('Invalid email or password.');
    }
});
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('Logged Out.');
});
app.listen(3000,()=>{
    console.log('Server started on http:??localhost:3000');
});
