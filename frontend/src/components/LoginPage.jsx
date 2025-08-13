import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, MessageSquare,User,Loader2  } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from './AuthImagePattern';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';





const LoginPage =()=>{

	
	const navigate = useNavigate();


	const [showPassword, setShowPassword] = useState(false);
		const[formData, setFormData]= useState({
			email:"",
			password:"",
		})
	
		const {login, isLoggingIn}= useAuthStore()

		const handleSubmit= (e)=>{
		e.preventDefault()
		  const success = login(formData); 
//   if (success) navigate("/");

			 
		}

	

	return (
		<div className="min-h-screen  grid lg:grid-cols-2">
			{/* Left side of the form */}
		<div className= "flex flex-col justify-center items-center p-6 sm:p-12">
			<div className='w-full max-w-md space-y-8'>
				{/*Logo*/}
				<div className="flex flex-col items-center gap-2 group">
					<div
					className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
					group-hover:bg-primary/20 transition-colors"> 
					 <MessageSquare className="size-6 text-primary"/>
					</div>
					<h1 className="text-xl font-bold mt-2">Create Account</h1>
					<p className="text-base-content/60">Get started with your free account</p>

				</div>

				<form onSubmit={handleSubmit}className="space-y-6">
					
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium mr-80">	Email</span>
						</label>

							<div className="relative">
								

								<input type="email"
								className={`input input-bordered w-full pl-10`} 
								placeholder="your@example.com"
								value={formData.email}
								onChange={(e)=> setFormData({...formData, email: e.target.value})}
								/>

							</div>
							
					</div>
					<div className="form-control">
						<label className="label">
							<span className="label-text font-medium mr-74">Password</span>
						</label>

							<div className="relative">
								

								<input type={showPassword ? "text":"password"}
								className={`input input-bordered w-full pl-10 placeholder:mb-10`} 
								placeholder="********"
								value={formData.password}
								onChange={(e)=> setFormData({...formData, password: e.target.value})}
								/>
								<button
								type="button"
								className="absolute inset-y-0 right-0 pr-3 flex items-center"
								onClick={()=> setShowPassword(!showPassword)}
								>
									{ showPassword ? (
										<EyeOff className="size-3 text-base-content/40"/>
									 ) : (
										<Eye className="size-3 text-base-content/40"/>
									 )} 
								</button>

							</div>
							
					</div>

					<button type="submit" className="btn btn-active btn-primary bg-purple-900 w-full" disabled={isLoggingIn}>
						{isLoggingIn ? (
							<>
							<Loader2 className="size-5 animate-spin"/>
								Loading
							</>
						): (
							"Sign In"
						)}
					</button>

				</form>

				<div className="text-center">
					<p className="tet-base-content/60">
					Don't have an account? {""}
					<Link to ="/signup" className="link link-primary">
					Sign Up
					</Link>
					</p>
				</div>

			</div>

		</div>

		{/* Right side of the form */}

		<AuthImagePattern 
		title="Join Our community"
		subtitle="Connect eith friends, share moments, and stay in touch with the people you care about."
		/>

		</div>
		
	)
	}



export default LoginPage