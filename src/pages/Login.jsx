import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const mockEmail = "danilopelaso";
    const mockPassword = "password";

    if (email === mockEmail && password === mockPassword) {
      login();
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }

    if (isAuthenticated) {
      navigate("/home");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <Card className="w-[400px] shadow-md">
            <CardHeader>
              <div className="flex justify-center">
                <CardTitle className="font-bold text-[35px]">Login</CardTitle>
              </div>
              <div className="flex justify-center">
                <CardDescription>This is a basic Quiz App</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-2 m-3">
                  <Label className="text-[17px]" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 m-3">
                  <Label className="text-[17px]" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-center w-full">
                <Button
                  className="w-full mx-3 active:opacity-[0.9]"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </CardFooter>
          </Card>


          
        </div>
      </div>
    </>
  );
};

export default Login;