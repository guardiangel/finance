import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//Grab data from backend server.
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.VITE_BASE_URL}),
   reducerPath:"main",
   tagTypes:["Kpis"],
   endpoints:(build)=>({
    getKpis:build.query<void,void>({
        query:()=>"kpi/kpis",
        providesTags:["Kpis"]
    })
   })
})

export const {useGetKpisQuery} = api;