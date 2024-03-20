// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import { useSettings } from 'src/@core/hooks/useSettings';
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import Request from 'src/request';
import ProjectLayout from "src/layouts/ProjectLayout";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { settings, saveSettings } = useSettings();
    const [data, setData] = useState({})
    const router = useRouter();

    useEffect(() => {
        console.log(settings.selectedProject);
        Request.getOneBusiness(settings.selectedProject).then((response) => {
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const deleteBusiness = () => {
        Request.deleteOneBusiness(settings.selectedProject).then((response) => {
            toast.success('You deleted business successfully.')
            router.push('/');
        }).catch(error => {
            toast.error('Deleting business failed.')
            console.log(error.response)
        });
    }

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Trophy data={data} />
                </Grid>
                <Grid item xs={12}>
                    <StatisticsCard data={data} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <WeeklyOverview />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <TotalEarning />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Grid container spacing={6}>
                        <Grid item xs={6}>
                            <CardStatisticsVerticalComponent
                                stats='$25.6k'
                                icon={<Poll />}
                                color='success'
                                trendNumber='+42%'
                                title='Total Profit'
                                subtitle='Weekly Profit'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CardStatisticsVerticalComponent
                                stats='$78'
                                title='Refunds'
                                trend='negative'
                                color='secondary'
                                trendNumber='-15%'
                                subtitle='Past Month'
                                icon={<CurrencyUsd />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CardStatisticsVerticalComponent
                                stats='862'
                                trend='negative'
                                trendNumber='-18%'
                                title='New Project'
                                subtitle='Yearly Project'
                                icon={<BriefcaseVariantOutline />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <CardStatisticsVerticalComponent
                                stats='15'
                                color='warning'
                                trend='negative'
                                trendNumber='-18%'
                                subtitle='Last Week'
                                title='Sales Queries'
                                icon={<HelpCircleOutline />}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <SalesByCountries />
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                    <DepositWithdraw />
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title='Delete Project'
                        />
                        <CardContent>
                            <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
                                <Typography variant='body2'>You will permanently remove all dependent data.</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button fullWidth variant='contained' sx={{ width: "300px", backgroundColor: "error.main" }} onClick={deleteBusiness}>
                                    Delete
                                </Button>
                            </Box>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}
Dashboard.getLayout = page => <ProjectLayout>{page}</ProjectLayout>

export default Dashboard
