import { Button } from "../components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const handleExaminerClick = () => {
    navigate("/examiner");
  };

  const handleExamineeClick = () => {
    navigate("/examinee");
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="flex space-x-3">
          {userRole === "Examiner" && (
            <Button onClick={handleExaminerClick} className="font-bold">
              Examiner
            </Button>
          )}
          {userRole === "Examinee" && (
            <Button onClick={handleExamineeClick} className="font-bold">
              Examinee
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
