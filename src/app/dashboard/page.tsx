import { Box, useMediaQuery } from '@mui/material';
import React from 'react'
import FirstRow from './FirstRow';
import SecondRow from './SecondRow';
import ThirdRow from './ThirdRow';

const gridTemplateLargeScreen= `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
const gridTemplateSmallScreen= `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isOverMediumScreen = useMediaQuery("(min-width: 1200px)");
  return (
    <Box width="100%" height="100%" display="grid" gap="1.5rem"
    sx={isOverMediumScreen?{
      gridTemplateAreas:gridTemplateLargeScreen,
      gridTemplateColumns:"repeat(3,minmax(370px,1fr))",
      gridTemplateRows:"repeat(10, minmax(60px, 1fr))",
    }:{
      gridTemplateAreas:gridTemplateSmallScreen,
      gridAutoColumns:"1fr",
      gridAutoRows:"80px",
    }}
    >
    
    <FirstRow/>
    <SecondRow/>
    <ThirdRow/>
    </Box>
  )
}
export default Dashboard;