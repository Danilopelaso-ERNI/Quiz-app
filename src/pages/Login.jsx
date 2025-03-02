import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Login = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (userRole === "Examinee") {
        navigate("/Examinee");
      } else if (userRole === "Examiner") {
        navigate("/Examiner");
      }
    }
  }, [isAuthenticated, navigate, userRole]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      if (userRole === "Examinee") {
        navigate("/Examinee");
      } else if (userRole === "Examiner") {
        navigate("/Examiner");
      }
    } catch (error) {
      setError("⛔ Invalid email or password");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center h-screen",
        className
      )}
      {...props}
    >
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center pb-3">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your Quiz App
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your erni account"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                  aria-label="Email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(""); 
                  }}
                  required
                  aria-label="Password"
                />
              </div>
              {error && <p className="text-red-700 text-center text-[14px] font-medium">{error}</p>}
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Microsoft
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
