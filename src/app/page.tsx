"use client"
import { ThemeProvider,CssBaseline, Box } from "@mui/material";
import { createTheme} from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import NavBar from '@/app/navbar/page';
import Dashboard from "./dashboard/page";
import { configureStore } from "@reduxjs/toolkit";
import {api} from "@/state/api"
import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {[api.reducerPath]:api.reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});
setupListeners(store.dispatch);


export default function Home() {
  const theme = useMemo(() => 
     createTheme(themeSettings)
  ,[])
  return (
    <div className="app">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
          <NavBar/>
          <Dashboard/>
        </Box>
        </ThemeProvider>
      </Provider>
    </div>
  );
}
