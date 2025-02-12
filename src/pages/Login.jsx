import React from "react";
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

const Login = () => {
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
              <div className="grid gap-2 m-3">
                <Label className="text-[17px]" htmlFor="email">
                  Email
                </Label>
                <Input id="email" type="email"></Input>
              </div>
              <div className="grid gap-2 m-3">
                <Label className="text-[17px]" htmlFor="password">
                  Password
                </Label>
                <Input id="password" type="password"></Input>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-center w-full">
                <Button className="w-full mx-3 peer-active:bg-gray-700">
                  Submit
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
