import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween";
import LineHeader from "@/components/LineHeader";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"
import { ExpensesByCategory } from "@/state/datatypes";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, PieChart, Pie } from "recharts";

type Props = {}

const ThirdRow = (props: Props) => {

  const {data:kpiData} = useGetKpisQuery();
  const {data:productData} = useGetProductsQuery();
  const {data:transactionData} = useGetTransactionsQuery();
  const {palette} = useTheme();
  const pieChartColors = [palette.primary[800], palette.primary[500]];

  const productColumns = [
    {field:"_id", headerName:"Product ID",flex:1},
    {field:"expense", headerName:"Expense",flex:0.5, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
    {field:"price", headerName:"Price",flex:0.5, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
  ]
  const transactionColumns = [
    {field:"_id", headerName:"Product ID",flex:1},
    {field:"buyer", headerName:"Buyer",flex:0.66, },
    {field:"amount", headerName:"Amount",flex:0.36, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
    {field:"productIds", headerName:"Count",flex:0.36, renderCell:(param:GridCellParams)=>(param.value as Array<string>).length},
  ]

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      const expensesByCategory:ExpensesByCategory = kpiData[0].expensesByCategory;
      const { "$*": removed, ...newObj } = expensesByCategory;//There is a $* in the result, have no idea what happens. The server return correct result. 
      return Object.entries(newObj).map(
        ([key, value]) => {
            return [
              {
                name: key,
                value: value,
              },
              {
                name: `${key} of Total`,
                value: totalExpenses - value,
              },
            ];
        }
      );
    }
  }, [kpiData]);


  return (
    <>
   <DashboardBox gridArea="g">
    <LineHeader title="List Of Products" sideContent={`${productData?.length} products`}/>
    <Box
      mt="0.5rem" 
      p="0 0.5rem"
      height="75%"
    sx={{
      "& .MuiDataGrid-root": {
        color: palette.grey[300],
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: `1px solid ${palette.grey[800]} !important`,
      },
      "& .MuiDataGrid-columnHeaders": {
        borderBottom: `1px solid ${palette.grey[800]} !important`,
      },
      "& .MuiDataGrid-columnSeparator": {
        visibility: "hidden",
      },
    }}
    >
    <DataGrid 
      columnHeaderHeight={15}
      rows={productData||[]}
      columns={productColumns}
      hideFooter={true}
    />
    </Box>
   </DashboardBox>

    <DashboardBox gridArea="h">
    <LineHeader title="Resent Order" sideContent={`${transactionData?.length} latest transactions`}/>
    <Box
      mt="1rem" 
      p="0 0.5rem"
      height="80%"
    sx={{
      "& .MuiDataGrid-root": {
        color: palette.grey[300],
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: `1px solid ${palette.grey[800]} !important`,
      },
      "& .MuiDataGrid-columnHeaders": {
        borderBottom: `1px solid ${palette.grey[800]} !important`,
      },
      "& .MuiDataGrid-columnSeparator": {
        visibility: "hidden",
      },
    }}
    >
    <DataGrid 
      columnHeaderHeight={15}
      rows={transactionData||[]}
      columns={transactionColumns}
      hideFooter={true}
    />
    </Box>
    </DashboardBox>

    <DashboardBox gridArea="i">
    <LineHeader title="Expense Breakdown By Category" sideContent="+5%"/>
    <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>

    </DashboardBox>
    <DashboardBox gridArea="j">
    <LineHeader
          title="Overall Summary and Explanation Data"
          sideContent="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
         This is summary.
        </Typography>
    </DashboardBox>
    </>
  )
}

export default ThirdRow