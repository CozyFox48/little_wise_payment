import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';
import { useSettings } from 'src/@core/hooks/useSettings';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from '@mui/material/Table'
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
import CardActions from '@mui/material/CardActions'
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        borderBottom: `1px solid ${theme.palette.divider}`
    },
    [theme.breakpoints.up('md')]: {
        borderRight: `1px solid ${theme.palette.divider}`
    }
}))

const Dashboard = () => {
    const { settings } = useSettings();
    const [data, setData] = useState({})
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        Request.getProduct(slug).then((response) => {
            setData(response.data.data)
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const deleteProduct = () => {
        Request.deleteProduct(slug).then((response) => {
            router.push('/project/products/');
            toast.success('The product has been deleted successfully.')
        }).catch(error => {
            toast.error('Deletion of the product failed.')
            console.log(error.response)
        });
    }

    const publishProduct = () => {
        Request.publishProduct(slug, { published: !data.published }).then((response) => {
            console.log(response.data.data)
            setData(response.data.data)
            toast.success('The product has been published successfully.')
        }).catch(error => {
            toast.error('Publishing of the product failed.')
            console.log(error.response)
        });
    }

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={6}>
                            <Grid
                                item
                                xs={12}
                                md={9}
                                sx={{
                                    paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
                                }}
                            >
                                <CardContent>
                                    <Typography variant='h5' sx={{ marginBottom: 2 }} fontWeight={900}>
                                        {data.name}
                                    </Typography>
                                    <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
                                        {data.summary}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, marginBottom: 0 }}>
                                        Type: {data.type}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 500, marginBottom: 1 }}>
                                        Category: {data.category}
                                    </Typography>
                                </CardContent>
                                <CardActions className='card-action-dense'>
                                    <Typography sx={{ my: 1, color: 'primary.main' }}>
                                        Project : {data.business?.title}
                                    </Typography>

                                </CardActions>
                            </Grid>
                            <StyledGrid item md={3} xs={12}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
                                </CardContent>
                            </StyledGrid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title={data.published ? 'This project is published.' : 'This project is unpublished.'}
                        />
                        <CardContent>
                            <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
                                <Typography variant='body2'>{data.published ? 'Will you stop publishing?' : 'Will you publish this product?'}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button fullWidth variant='contained' sx={{ width: "300px", backgroundColor: data.published ? "error.main" : "success.main" }}
                                    onClick={publishProduct}
                                >
                                    {data.published ? 'Unpublish' : 'Publish'}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Box sx={{ m: 4 }}>
                            <Typography variant='h6'>
                                Prices
                            </Typography>
                            <Button fullWidth variant='contained' sx={{ width: "300px", backgroundColor: "primary.main", m: 2 }} onClick={deleteProduct}>
                                Create New
                            </Button>
                        </Box>
                        <TableContainer>
                            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Currency</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {data?.prices?.map(row => (
                                        <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.currency}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    color={statusObj[row.status].color}
                                                    sx={{
                                                        height: 24,
                                                        fontSize: '0.75rem',
                                                        textTransform: 'capitalize',
                                                        '& .MuiChip-label': { fontWeight: 500 }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {data?.prices?.length === 0 ?
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Typography variant='h6' sx={{ my: 12 }}>There is no price.</Typography>
                                </Box>
                                : <></>}
                        </TableContainer>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title='Delete Product'
                        />
                        <CardContent>
                            <Box sx={{ mb: 7, display: 'flex', alignItems: 'center' }}>
                                <Typography variant='body2'>You will permanently remove all dependent data.</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <Button fullWidth variant='contained' sx={{ width: "300px", backgroundColor: "error.main" }} onClick={deleteProduct}>
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
