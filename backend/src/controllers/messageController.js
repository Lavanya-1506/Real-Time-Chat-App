import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js"

export const getUsersforSideBar = async (req, res) => {
	try{
		const loggedInUserId = req.user._id; // Get the logged-in user's ID from the request
		const filteredUsers= await User.find({_id : {$ne: loggedInUserId}}).select("-password")
		res.status(200).json(filteredUsers);
	}catch(error){
		console.error("Error in getUsersforSideBar controller", error.message);
		res.status(500).json({message: "Internal server error"});
		
	}
}

export const getMessages = async (req, res) => {
	try{
		const userId= req.params._id
		const senderId= req.user._id

		const messages= await Message.find({
			$or:[      //This is a MongoDB logical operator. It allows you to specify multiple conditions, and if any of them are true, the document (message) will be returned. In essence, it's an "OR" condition.
				{senderId:senderId, receiverId:userId},
				{senderId:userId, receiverId:senderId}
			]
		})

		res.status(200).json(messages)

	}catch(error){
		console.error("Error in getMessages controller", error.message);
		res.status(500).json({message: "Internal server error"});

	}


}

export const sendMessage= async(req,res)=>{
	try{
		const{text,image}=req.body;
		const receiverId= req.params.id
		const senderId= req.user._id

		let imageUrl;

		if(image){
			const uploadResponse= await cloudinary.uploader.upload(image);
			imageUrl= uploadResponse.secure_url;
		}
		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image:imageUrl
		})

		await newMessage.save();
        // real time functionality

		res.status(201).json(newMessage)
		
	}catch(error){
		console.error("Error in sendMessage controller", error.message);
		res.status(500).json({message: "Internal server error"});

	}


}