"use client"
import { ThemeProvider,CssBaseline, Box } from "@mui/material";
import { createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import NavBar from "@/pages/navbar/index";

export default function Home() {
  const theme = useMemo(() => 
     createTheme(themeSettings)
  ,[])
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
        <NavBar/>
        aaaaaa
        </Box>
        </ThemeProvider>
    </div>
  );
}
