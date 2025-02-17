import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
const Home = () => {
  const navigate = useNavigate();

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
          <Button onClick={handleExamineeClick} className="font-bold">
            Examinee
          </Button>
          <Button onClick={handleExaminerClick} className="font-bold">
            Examiner
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
