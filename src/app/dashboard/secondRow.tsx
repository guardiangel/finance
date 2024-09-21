import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import LineHeader from "@/components/LineHeader";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { PieChart, Pie, Scatter,Sector, Cell, AreaChart, Area, XAxis, Bar, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Legend, LineChart, BarChart, Rectangle, ScatterChart, ZAxis } from 'recharts';



const SecondRow = () => {
  const {data:operationaData} = useGetKpisQuery();
  const {data:productData} = useGetProductsQuery();
  const {palette} = useTheme();
  const pieChartColors = [palette.primary[800], palette.primary[300]];

  const operationaExpense = useMemo(()=>{
    return (operationaData 
      && 
      operationaData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses})=>{
      return {
        name:month.substring(0,3), 
        OperationalExpense:operationalExpenses,
        nonOperationalExpense:nonOperationalExpenses
      };
    })
    );
  }, [operationaData]);

  
  const productExpenseData = useMemo(()=>{
    return (productData 
      && 
      productData.map(({_id,price,expense})=>{
      return {
        id:_id,
        price:price,
        expense:expense,
      };
    })
    );
  }, [productData]);

  /**
   * Use this way instead of defining the array directly to avoid the issue:
   * Hydration failed because the initial UI does not match what was rendered on the server
   * I think it's because that PieChart need data in advance.
   */
  const [pieChartData, setPieChartData] = useState<any>([]);
  useEffect(()=>{
    const pieData = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ]
    setPieChartData(pieData);
  },[]);
  

  return (
    <>
     <DashboardBox gridArea="d">
    <LineHeader 
    title="Operational vs Non-operational Expenses" 
    sideContent="+4%"/>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={operationaExpense}
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
          orientation="left"
          />
          <YAxis 
          axisLine={false} 
          style={{fontSize:"10px"}} 
          tickLine={false}
          yAxisId="right"
          orientation="right"
          />
          <Tooltip />
          <Line 
          yAxisId="left"
          type="monotone"
          dataKey="nonOperationalExpense"
          stroke={palette.tertiary[600]}
          />
           <Line 
          yAxisId="right"
          type="monotone"
          dataKey="OperationalExpense"
          stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>


    <DashboardBox gridArea="e">
      <LineHeader title="Actions and Targets" sideContent="+5%"></LineHeader>
      <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
      <PieChart width={120} 
          height={110}
          margin={{
            top: 15,
            right: -10,
            left: 10,
            bottom: 5
          }}
          >
          <Pie
            stroke="1"
            data={pieChartData}
            innerRadius={25}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
            ))}
          </Pie>
        </PieChart>
        <Box ml="-1rem" flexBasis="40%" textAlign="center">
          <Typography  variant="h5" >Target Sales</Typography>
          <Typography m="0.3rem 0" color={palette.primary[300]} variant="h3">88</Typography>
          <Typography  variant="h5" >Goal of actions</Typography>
        </Box>

        <Box flexBasis="40%" >
          <Typography  variant="h5" >Reduction of Revenue</Typography>
          <Typography  mt="0.4rem" variant="h5">Profit Margins</Typography>
          <Typography  variant="h5" >Profit Margins are up</Typography>
        </Box>
        </FlexBetween>
    </DashboardBox>


    <DashboardBox gridArea="f">
      <LineHeader title="Product Prices vs Expenses" sideContent="+5%"/>
      <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 50,
              left: 0,
            }}
          >
            <CartesianGrid stroke={palette.grey[700]}/>
            <XAxis 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}
            tickFormatter={(value)=>`$${value}`}
            type="number" 
            dataKey="price" 
            name="price" 
            unit="USD" />
            <YAxis 
            axisLine={false}
            tickLine={false}
            style={{fontSize:"10px"}}
            tickFormatter={(value)=>`$${value}`}
            type="number" 
            dataKey="expense" 
            name="expense" 
            unit="USD" />
            <ZAxis
              type="number"
              range={[25]}
            />
            <Tooltip formatter={(value)=>`$${value}`}/>
            <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>
    </DashboardBox>

    </>
  )
}

export default SecondRow