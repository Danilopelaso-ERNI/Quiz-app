// Home.js
import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleExaminerClick = () => {
    navigate("/examiner");
  };

  const handleExamineeClick = () => {
    navigate("/examinee");
  };

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-3">
          <Button onClick={handleExamineeClick} className="font-bold">Examinee</Button>
          <Button onClick={handleExaminerClick} className="font-bold">Examiner</Button>
          <Button onClick={handleLogout} className="font-bold">Logout</Button>
        </div>
      </div>
    </>
  );
};

export default Home;