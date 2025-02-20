import React from "react";
import { useAuth } from "../AuthContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <div className="absolute top-4 right-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button onClick={handleLogout} className="font-bold rounded-lg">
            <LogOut className="font-bold" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
