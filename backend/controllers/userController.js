import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (req,res)=>{
    try{
       const {name,email,password}  = req.body;

       const userExist = await User.findOne({email})

       if(userExist){
        return res.status(400).json({
            message:'User Already Exists'
        })
       }
       
       const hashedPassword = await bcrypt.hash(password,10)
       
       const user = await User.create({
        name,
        email,
        password:hashedPassword
       })
       res.status(201).json({
        message:'User Registerd',
        user
       })



    }catch(err){
        console.log('error from register controller',err);
        
    }
}

export const loginuser = async(req,res)=>{
    try{
        const { email, password } = req.body;

       

        if(email==process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign(
                {isAdmin:true},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )

            return res.status(200).json({
                message:'Admin Login Success',
                email,
                isAdmin:true,
                token
            })
        }


        const user =await User.findOne({ email })
        console.log('user',user);

        

        if(!user){
            return res.status(400).json({
                message:"User Not Found"
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        console.log(isMatch,'im');
        
        if(!isMatch){
            return res.status(400).json({
                message:"Incorrect Password"
            })
        }
        const token = jwt.sign(
                {isAdmin:false,id:user._id},
                process.env.JWT_SECRET,
                {expiresIn:"1d"}
            )
        res.status(200).json({
            message:'Login Success',
            email,
            isAdmin:false,
            token
            
        })



    }
    catch(err){
        console.log("errof from login controller",err);
        
    }
}