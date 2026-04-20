import { API_URL, SOCKET_URL } from "@/apiConfig";
import React, { useState } from "react";
import { KeyRound, Lock, Mail, Phone, User, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'sonner';

import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { login } from "../redux/features/auth/authSlice";
import { signUpSchema } from "../utils/validationSchemas";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  const google = () => {
    window.open(`${SOCKET_URL}/auth/google/callback`, "_self");
  };

  const handleOtpGeneration = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter email first");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/generateotp`, {
        email,
      });
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent successfully.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error generating OTP");
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const registrationResponse = await axios.post(
        `${API_URL}/users/register`,
        data,
        { withCredentials: true }
      );

      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || "Registered successfully!");
        
        const userCookie = Cookies.get('user');
        const token = Cookies.get('token');
        
        if (userCookie && token) {
          try {
            const decodedUserCookie = decodeURIComponent(userCookie);
            const cleanedUserJson = decodedUserCookie.startsWith('j:') 
              ? decodedUserCookie.slice(2) 
              : decodedUserCookie;
            const user = JSON.parse(cleanedUserJson);

            const payload = {
              userInfo: user,
              isAuthenticated: true,
              token
            };
            dispatch(login(payload));
          } catch (e) {
            console.error("Error parsing user cookie", e);
          }
        }
        
        setTimeout(() => {
          navigate('/personal_details');
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent bg-[url('/LandingPagebackgroundblur.png')] bg-no-repeat bg-cover bg-fixed">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-2xl -z-10" />
      
      
      <div className="flex flex-col min-h-screen p-4 lg:w-2/5 z-0 justify-center">
        <div className="bg-white/70 backdrop-blur-md border border-white/40 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-deep-plum tracking-tight">
            Create Account
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <FormLabel htmlFor="firstName" error={!!errors.firstName}>First Name</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-9 bg-white/50 focus:bg-white transition-all"
                    {...register("firstName")}
                  />
                </div>
                <FormMessage>{errors.firstName?.message}</FormMessage>
              </FormItem>

              <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <FormLabel htmlFor="lastName" error={!!errors.lastName}>Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-white/50 focus:bg-white transition-all"
                  {...register("lastName")}
                />
                <FormMessage>{errors.lastName?.message}</FormMessage>
              </FormItem>
            </div>

            {/* Email */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-400">
              <FormLabel htmlFor="email" error={!!errors.email}>Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-9 bg-white/50 focus:bg-white transition-all"
                  {...register("email")}
                />
              </div>
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>

            {/* Mobile */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <FormLabel htmlFor="mobile" error={!!errors.mobile}>Mobile Number</FormLabel>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="mobile"
                  placeholder="10-digit number"
                  className="pl-9 bg-white/50 focus:bg-white transition-all"
                  {...register("mobile")}
                />
              </div>
              <FormMessage>{errors.mobile?.message}</FormMessage>
            </FormItem>

            {/* Passwords Row */}
            <div className="grid grid-cols-1 gap-5">
              <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-600">
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

              <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                <FormLabel htmlFor="confirmPassword" error={!!errors.confirmPassword}>Confirm Password</FormLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9 bg-white/50 focus:bg-white transition-all"
                    {...register("confirmPassword")}
                  />
                </div>
                <FormMessage>{errors.confirmPassword?.message}</FormMessage>
              </FormItem>
            </div>

            {/* OTP */}
            <FormItem className="animate-in fade-in slide-in-from-bottom-2 duration-800">
              <FormLabel htmlFor="otp" error={!!errors.otp}>OTP Verification</FormLabel>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    placeholder="Enter OTP"
                    className="pl-9 bg-white/50 focus:bg-white transition-all"
                    {...register("otp")}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 border-deep-plum/20 hover:bg-deep-plum/5 text-deep-plum transition-all"
                  onClick={handleOtpGeneration}
                >
                  Get OTP
                </Button>
              </div>
              <FormMessage>{errors.otp?.message}</FormMessage>
            </FormItem>

            <Button
              type="submit"
              className="w-full h-11 bg-deep-plum hover:bg-hot-purple text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] mt-4"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              onClick={google} 
              variant="outline"
              className="w-full h-11 border-gray-300 bg-white/50 hover:bg-white transition-all flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground animate-in fade-in duration-1000">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-deep-plum hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



