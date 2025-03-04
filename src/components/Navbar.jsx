import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../AuthContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout();
    navigate("/"); // Navigate to the login page after logout
  };

  return (
    <div>
      <div className="absolute top-5 right-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button onClick={handleLogout} className="font-bold rounded-lg">
            <LogOut className="font-bold" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
