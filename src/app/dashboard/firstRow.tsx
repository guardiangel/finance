import DashboardBox from "@/components/DashboardBox"

type Props = {}

const FirstRow = (props: Props) => {
  return (
    <>
    <DashboardBox gridArea="a"></DashboardBox>
    <DashboardBox gridArea="b"></DashboardBox>
    <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default FirstRow