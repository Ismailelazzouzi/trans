import Button from "../components/Button";

import { useNavigation } from '../hooks/useNavigation';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import * as z from "zod"; 

import googleIcon from '../assets/google.png'
import eyeIcon from '../assets/eye.png'
import eyeCloseIcon from '../assets/eyeClose.png'


const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const interactionStatus = {
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false
};

const signUpSchema = z.object({
    firstName: z.string().min(3, "first name must be at least 3 characters"),
    lastName: z.string().min(3, "last name must be at least 3 characters"),
    userName: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please Enter a valid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain one uppercase letter")
        .regex(/[a-z]/, "Must contain one lowercase letter")
        .regex(/[0-9]/, "Must contain one number")
        .regex(/[\W_]/, "Must contain one special character"),
    confirmPassword: z
        .string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export default function Register() {
    
    
    const { goToLogin } = useNavigation();
    const { loginUser } = useAuth();
    const [formData, setFormData] = useState(initialState);
    const validation = signUpSchema.safeParse(formData);
    const isInvalid = !validation.success;
    const [touched, setTouched] = useState(interactionStatus);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        if (isInvalid === true)
            return ;
        const {confirmPassword, ...registerData} = validation.data;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerData),
                credentials: "include"
            });
            const data = await response.json();
            if (response.ok)
            {
                loginUser(data.data.user);
                navigate('/dashboard');
            }
            else
                alert(data.message || 'signUp failed');
        }catch (error) {
            alert(error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL;
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center pb-20">
            <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-emerald-500/20 p-10 rounded-2xl w-full max-w-2xl flex flex-col gap-6">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-white tracking-tighter">Join Us</h2>
                    <p className="text-slate-400 mt-2">Enter your details to Join the Hive.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-emerald-400 text-sm font-medium">FIRST NAME</label>
                        <input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            id="firstName"
                            className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            type="text" 
                            placeholder="First Name"
                        />
                        {touched.firstName && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().firstName?._errors[0]}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-emerald-400 text-sm font-medium">LAST NAME</label>
                        <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            id="lastName"
                            className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            type="text" 
                            placeholder="Last Name"
                        />
                        {touched.lastName && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().lastName?._errors[0]}</span>}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="userName" className="text-emerald-400 text-sm font-medium">USERNAME</label>
                    <input 
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        id="userName"
                        className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                        type="text" 
                        placeholder="Username"
                    />
                    {touched.userName && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().userName?._errors[0]}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-emerald-400 text-sm font-medium">EMAIL</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        id="email"
                        className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                        type="text" 
                        placeholder="Email"
                    />
                    {touched.email && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().email?._errors[0]}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-emerald-400 text-sm font-medium">Password</label>
                    <div className="relative w-full">
                        <input
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" type="button">
                            {showPassword && <img className="w-6" src={eyeIcon}/>}
                            {!showPassword && <img className="w-6" src={eyeCloseIcon}/>}
                        </button>
                    </div>
                    {touched.password && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().password?._errors[0]}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-emerald-400 text-sm font-medium">Confirm Password</label>
                    <div className="relative w-full">
                        <input 
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="••••••••"
                        />
                        <button onClick={() => setShowConfirm(!showConfirm)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2" type="button">
                            {showConfirm && <img className="w-6" src={eyeIcon}/>}
                            {!showConfirm && <img className="w-6" src={eyeCloseIcon}/>}
                        </button>
                    </div>
                    {touched.confirmPassword && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().confirmPassword?._errors[0]}</span>}
                </div>
                <Button label="Sign Up" variant="primary" disabled={isInvalid}/>
                <button onClick={handleGoogleLogin} type="button" className="cursor-pointer flex items-center justify-center gap-3 w-full bg-slate-900 border border-slate-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-800 transition-all">
                    <img src={googleIcon} alt="Google" className="w-5 h-5"/>
                    Continue with Google       
                </button>
                <p className="text-center text-slate-500 text-sm">
                    Already have an account? <span onClick={goToLogin} className="text-emerald-500 cursor-pointer hover:underline">Log In</span>
                </p>
            </form>
        </div>
    );
}