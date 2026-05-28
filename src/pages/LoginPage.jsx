import { API_URL, SOCKET_URL } from "@/apiConfig";
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { login } from '../redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { loginSchema } from '../utils/validationSchemas';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock } from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const error = queryParams.get('error');
        if (error === 'already_registered_local') {
            toast.error("User already registered with this email. Please try to login.");
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/users/login`, data, { withCredentials: true });

            toast.success(res.data.message);

            const { user, token, myProfile } = res.data;
            if (user && token) {
                const payload = {
                    userInfo: user._doc || user,
                    myProfile,
                    isAuthenticated: true,
                    token
                };
                dispatch(login(payload));
                navigate('/home');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent bg-[url('/LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />

            <div className="flex flex-col min-h-screen p-4 lg:w-2/5 z-0 justify-center">
                <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    <h2 className="text-3xl font-extrabold mb-8 text-center text-deep-plum tracking-tight">Login</h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <FormLabel htmlFor="email" error={!!errors.email}>Email / Mobile</FormLabel>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="text"
                                    placeholder="john@example.com"
                                    className="pl-9 bg-white/50 focus:bg-white transition-all"
                                    {...register("email")}
                                />
                            </div>
                            <FormMessage>{errors.email?.message}</FormMessage>
                        </FormItem>

                        <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-400">
                            <FormLabel htmlFor="password" error={!!errors.password}>Password</FormLabel>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-9 bg-white/50 focus:bg-white transition-all"
                                    {...register("password")}
                                />
                            </div>
                            <FormMessage>{errors.password?.message}</FormMessage>
                        </FormItem>

                        <Button 
                            type="submit" 
                            className="w-full h-11 bg-deep-plum hover:bg-hot-purple text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4" 
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                "Log In"
                            )}
                        </Button>
                    </form>
                    
                    <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Link to={'/forgot-password'} className="text-sm font-semibold text-deep-plum hover:underline">Forgot password?</Link>
                    </div>
                    <div className="mt-2 text-center animate-in fade-in slide-in-from-bottom-4 duration-600">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/sign_up" className="font-semibold text-deep-plum hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;



