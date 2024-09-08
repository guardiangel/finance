"use client"
import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
type Props = {}

const Navbar = (props: Props) => {
  const {palette} = useTheme();
  const [selected, setSelected] = useState("dashboard")
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette?.grey?.[300]}>
      {/**left side logo*/}
      <FlexBetween gap="0.75rem">
        <AccountBalanceIcon sx={{fontSize:"30px"}}/>
        <Typography variant='h4' fontSize="16px">
          Finance App
        </Typography>
      </FlexBetween>

      {/**right side */}
      <FlexBetween gap="2rem">
        
      <Box sx={{"&:hover":{color:palette?.primary?.[100]}}}>
          <Link href="/" 
          onClick={()=>setSelected("dashboard")}/**used for highlight the color */
          style={{
            color:selected==="dashboard"?"inherit":palette?.grey?.[700], 
           textDecoration:"inherit" /** grab the style of the Box component.*/
          }}
          >Dashboard</Link>
        </Box>

        <Box sx={{"&:hover":{color:palette?.primary?.[100]}}}>
          <Link href="/predictions" 
          onClick={()=>setSelected("predictions")}/**used for highlight the color */
          style={{
            color:selected==="predictions"?"inherit":palette?.grey?.[700], 
           textDecoration:"inherit" /** grab the style of the Box component.*/
          }}
          >Predictions</Link>
        </Box>
       
      </FlexBetween>

    </FlexBetween>
  )
}

export default Navbar