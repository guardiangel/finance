import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { GetKpisReponse } from "./datatypes";

//Grab data from backend server.
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_VITE_BASE_URL}),
   reducerPath:"main",
   tagTypes:["Kpis"],
   endpoints:(build)=>({
    getKpis:build.query<Array<GetKpisReponse>,void>({
        query:()=>"kpi/kpis",
        providesTags:["Kpis"]
    })
   })
})

export const {useGetKpisQuery} = api;