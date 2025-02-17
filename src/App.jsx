import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Examinee from "./pages/Examinee";
import Examiner from "./pages/Examiner";
import { AuthProvider } from "./authContext";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <ModeToggle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/examinee" element={<Examinee />} />
            <Route path="/examiner" element={<Examiner />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
