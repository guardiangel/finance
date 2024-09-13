"use client"
import LineHeader from "@/components/LineHeader";
import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@emotion/react";
import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, LineChart } from 'recharts';

type Props = {}

const FirstRow = (props: Props) => {
  const {data} = useGetKpisQuery();
  const {palette} = useTheme();
  const expense = useMemo(()=>{
    return (data 
      && 
      data[0].monthlyData.map(({month, revenue, expenses})=>{
      return {
        name:month.substring(0,3), 
        revenue:revenue,
        expenses:expenses
      };
    })
    );
  }, [data]);

const revenueProfit = useMemo(()=>{
    return (data 
      && 
      data[0].monthlyData.map(({month, revenue, expenses})=>{
      return {
        name:month.substring(0,3), 
        revenue:revenue.toFixed(2), 
        profit:(revenue - expenses).toFixed(2),
      };
    })
    );
  }, [data]);



  return (
    <>
    <DashboardBox gridArea="a">
      <LineHeader title="RevenueExpense" subTitle="Top stands for revenue, bottom is expense" sideContent="+4%"/>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={expense}
          margin={{
            top: 15,
            right: 20,
            left: -10,
            bottom: 60,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5}/>
              <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
          dataKey="name" 
          style={{fontSize:"10px"}} 
          tickLine={false} />
          <YAxis 
          axisLine={{strokeWidth:"0}"}} 
          style={{fontSize:"10px"}} 
          tickLine={false}
          domain={[8000,23000]}
          />
          <Tooltip />
          <Area 
          type="monotone" 
          dataKey="revenue" 
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorRevenue)"
          />
           <Area 
          type="monotone" 
          dataKey="expenses" 
          dot={true}
          stroke={palette.primary.main} 
          fillOpacity={1}
          fill="url(#colorExpenses)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="b">
    <LineHeader 
    title="ProfitRevenue" 
    subTitle="Top stands for revenue, bottom is expense" 
    sideContent="+4%"/>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 60,
          }}
        >
         <CartesianGrid vertical={false} stroke={palette.grey[800]}></CartesianGrid>
          <XAxis 
          dataKey="name" 
          style={{fontSize:"10px"}} 
          tickLine={false} />
          <YAxis 
          axisLine={false} 
          style={{fontSize:"10px"}} 
          tickLine={false}
          yAxisId="left"
          />
          <YAxis 
          axisLine={false} 
          style={{fontSize:"10px"}} 
          tickLine={false}
          yAxisId="right"
          orientation="right"
          />
          <Tooltip />
          <Legend height={20} wrapperStyle={{margin:"0 0 10px 0"}}/>
          <Line 
          yAxisId="left"
          type="monotone"
          dataKey="profit"
          stroke={palette.tertiary[600]}
          />
           <Line 
          yAxisId="right"
          type="monotone"
          dataKey="revenue"
          stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
    <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default FirstRow