// ** MUI Imports
import Grid from '@mui/material/Grid'
import DashboardLayout from "src/layouts/DashboardLayout";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

const Dashboard = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4'>All Projects</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained'>
            Create New
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography variant='h6'>Congratulations John!</Typography>
              <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
                Best seller of the month
              </Typography>
              <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                $42.8k
              </Typography>
              <Button size='small' variant='contained'>
                View Detail
              </Button>
              <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}
Dashboard.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
