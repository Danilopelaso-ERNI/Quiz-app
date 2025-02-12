import React from "react";
import Login from "./pages/Login";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <ModeToggle />
        <Login />
      </>
    </ThemeProvider>
  );
};

export default App;
