import Button from "../components/Button";

import { useNavigation } from '../hooks/useNavigation';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as z from "zod"; 
import { useAuth } from "../hooks/useAuth";

import googleIcon from '../assets/google.png'
import eyeIcon from '../assets/eye.png'
import eyeCloseIcon from '../assets/eyeClose.png'

const loginSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[\W_]/, "Must contain one special character"),
});

const interactionStatus = {
    email: false,
    password: false,
};

const initialState = {
    email: "",
    password: ""
};


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [touched, setTouched] = useState(interactionStatus);
    const { loginUser } = useAuth();
    const validation = loginSchema.safeParse(formData);
    const isInvalid = !validation.success;
    const navigate = useNavigate();


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if (isInvalid === true)
            return ;
        const loginData = validation.data;
        try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
            credentials: "include"
        });

        const data = await response.json();

        if (response.ok) {
            loginUser(data.data.user);
            navigate("/dashboard");
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
            console.error("Connection error:", error);
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

    const { goToRegister } = useNavigation();
    return (
        <div className="flex min-h-[80vh] items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-emerald-500/20 p-10 rounded-2xl w-full max-w-md flex flex-col gap-6">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold text-white tracking-tighter">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Enter your details to access the Hive.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-emerald-400 text-sm font-medium">Email</label>
                    <input 
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                        type="text" 
                        placeholder="Email"
                    />
                </div>
                {touched.email && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().email?._errors[0]}</span>}
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-emerald-400 text-sm font-medium">Password</label>
                    <div className="relative">
                    <input 
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-slate-900 border border-slate-700 p-3 pr-15 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" 
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-1 top-1/2 -translate-y-1/2" type="button">
                        {showPassword && <img className="w-6" src={eyeIcon}/>}
                        {!showPassword && <img className="w-6" src={eyeCloseIcon}/>}
                    </button>
                    </div>
                    {touched.password && !validation.success && <span className="text-red-500 text-xs">{validation.error.format().password?._errors[0]}</span>}
                </div>
                <Button label="Sign In" variant="primary" disabled={isInvalid}/>
                
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-slate-700"></div>
                    <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-slate-700"></div>
                </div>

                <button onClick={handleGoogleLogin} type="button" className="cursor-pointer flex items-center justify-center gap-3 w-full bg-slate-900 border border-slate-700 text-white py-3 px-6 rounded-lg font-medium hover:bg-slate-800 transition-all">
                    <img src={googleIcon} alt="Google" className="w-5 h-5"/>
                    Continue with Google       
                </button>
                <p className="text-center text-slate-500 text-sm">
                    Don't have an account? <span onClick={goToRegister} className="text-emerald-500 cursor-pointer hover:underline">Register</span>
                </p>
            </form>
        </div>
    );
}