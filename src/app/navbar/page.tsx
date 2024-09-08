"use client"
import FlexBetween from '@/components/FlexBetween';
import { useTheme } from '@emotion/react';
type Props = {}

const Navbar = (props: Props) => {
  const {palette} = useTheme();
  return (
    <FlexBetween>
      navbar abc
    </FlexBetween>
  )
}

export default Navbar