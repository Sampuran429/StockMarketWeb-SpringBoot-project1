import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Auth.css";
import SignupForm from "./SignupForm"; // Import SignupForm

import ForgotPasswordForm from "./ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import SigninForm from "./SiginForm";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formType, setFormType] = useState(""); // State to track form type

    // Update form type whenever the route changes
    useEffect(() => {
        if (location.pathname === "/signup") {
            setFormType("signup");
        } else if (location.pathname === "/forgot-password") {
            setFormType("forgot-password");
        } else {
            setFormType("signin");
        }
    }, [location.pathname]);

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white">
            <h1 className="text-6xl font-bold pb-9">HI-STOCK</h1>
            {formType === "signup" ? (
                <section className="w-full">
                    <SignupForm />  {/* Display SignupForm */}
                    <div className="flex items-center justify-center">
                        <span>Already have an account?</span>
                        <Button onClick={() => navigate("/signin")} variant="ghost">
                            Sign In
                        </Button>
                    </div>
                </section>
            ) : formType === "forgot-password" ? (
                <section>
                    <ForgotPasswordForm />
                    <div className="flex items-center justify-center">
                        <span>Back to Login </span>
                        <Button onClick={() => navigate("/signin")} variant="ghost">
                            Sign In
                        </Button>
                    </div>
                </section>
            ) : (
                <section className="w-full">
                    <SigninForm/> {/* Display SigninForm */}
                    <div className="flex items-center justify-center">
                        <span>Dont have an account?</span>
                        <Button onClick={() => navigate("/signup")} variant="ghost">
                            Sign Up
                        </Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button className="w-full py-5" onClick={() => navigate("/forgot-password")} variant="outline">
                            Forgot Password
                        </Button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Auth;
