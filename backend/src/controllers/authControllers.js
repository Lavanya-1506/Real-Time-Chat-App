import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req,res)=>{
   const {email,fullName,password}= req.body;
	try{
		if (password.length < 6){
			return res.status(400).json({message:'Password must be at least 6 characters long'});	
		}
		const users= await User.findOne({email});
		if(users){
			return res.status(400).json({message:'User already exists'});
		}

		const hashedPassword= await bcrypt.hash(password,10);
		const newUser= new User({fullName, email, password:hashedPassword})

		if(newUser){
			generateToken(newUser._id,res)
			await newUser.save();

			res.status(201).json({
				_id:newUser._id,
				fullName: newUser.fullName,
				email:newUser.email,
				profilePic: newUser.profilePic,
				message:"Signup successful"
			})
		}else{
			res.status(400).json({message:"Invalid user data"})
		}
	}catch(error){
		console.log("Error in signup controller ", error.message)
		res.status(500).json({message:"Internal server error"})
	}
}

export const login = async (req,res)=>{
	const{email,password}= req.body;
	try{
		const users= await User.findOne({email})
		if(!users){
			return res.status(400).json({message:"Invalid credentials"})
		}

		const isMatch= await bcrypt.compare(password, users.password)
		if(!isMatch){
			return res.status(400).json({message:"Invalid credentials"})
		}

		generateToken(users._id, res)
			res.status(201).json({
				_id:users._id,
				fullName: users.fullName,
				email:users.email,
				profilePic: users.profilePic,
				message:"Login successful"
			})
	}catch(error){
		console.log("Error in login controller ", error.message)
		res.status(500).json({message:"Internal server error"})
	}

}

export const logout =(req,res)=>{
	try{
		res.cookie("jwt", "",{
			maxAge: 0
		})
		res.status(200).json({message:"Logout successful"})
	}catch(error){
		console.log("Error in logout controller ", error.message)
		res.status(500).json({message:"Internal server error"})

	}
}

export const updateProfile =async(req,res)=>{
	
	try{
		const {profilePic} = req.body;
		const userId=req.user._id

		if(!profilePic){
			return res.status(400).json({message:"Profile picture is required"})
		}

		const uploadResponse=await cloudinary.uploader.upload(profilePic)
		const updateUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
		res.status(200).json(updateUser)
	}catch(error){
		console.log("Error in updateProfile controller ", error.message)
		res.status(500).json({message:"Internal server error"})
	}
}

export const checkAuth= (req,res) =>{
	try{
		res.status(200).json(req.user)
	}catch(error) {
		console.log("Error in checkAuth controller ", error.message)
		res.status(500).json({message:"Internal server error"})
		}
}

