import React from 'react'
import FlexBetween from './FlexBetween'
import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';

type Props = {
    icon?:React.ReactNode;
    title?:string
    subTitle?:string
    sideContent?:string
}

const LineHeader = ({icon,title,subTitle,sideContent}: Props) => {
    const {palette} = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
        <FlexBetween>
            {icon}
            <Box width="100%">
                <Typography variant="h4" mb="-0.1rem">{title}</Typography>
                <Typography variant="h6" mb="-0.1rem">{subTitle}</Typography>
            </Box>
        </FlexBetween>
        <Typography variant="h5" fontWeight="700" color={palette.primary[500]}>
            {sideContent}
        </Typography>
    </FlexBetween>
  )
}

export default LineHeader