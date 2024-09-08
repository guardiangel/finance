"use client"
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import React from 'react'

type Props = {}

const Dashboard = (props: Props) => {
    const {palette} = useTheme();
  return (
    <Box color={palette?.grey?.[300]}>
        Dashgboardaaa
    </Box>
  )
}
export default Dashboard;