import DashboardBox from "@/components/DashboardBox"
import LineHeader from "@/components/LineHeader";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api"
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";

type Props = {}

const ThirdRow = (props: Props) => {

  const {data:operationaData} = useGetKpisQuery();
  const {data:productData} = useGetProductsQuery();
  const {data:transactionData} = useGetTransactionsQuery();
  const {palette} = useTheme();

  const productColumns = [
    {field:"_id", headerName:"Product ID",flex:1},
    {field:"expense", headerName:"Expense",flex:0.5, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
    {field:"price", headerName:"Price",flex:0.5, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
  ]
  const transactionColumns = [
    {field:"_id", headerName:"Product ID",flex:1},
    {field:"buyer", headerName:"Buyer",flex:0.66, },
    {field:"amount", headerName:"Amount",flex:0.36, renderCell:(param:GridCellParams)=>`$${param?.value==null?'0.00':param.value}`},
    {field:"productIds", headerName:"Count",flex:0.36, renderCell:(param:GridCellParams)=>param.value.length},
  ]

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
    <DashboardBox gridArea="i"></DashboardBox>
    <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default ThirdRow