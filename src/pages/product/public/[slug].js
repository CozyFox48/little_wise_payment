import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';
import { ContentCopy, EyeOutline } from 'mdi-material-ui'
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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

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

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '1px solid gray',
    boxShadow: 24,
    p: 4,
    padding: '30px'
};

const Dashboard = () => {
    const [data, setData] = useState({})
    const router = useRouter();
    const { slug } = router.query;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [requestBody, setRequestBody] = useState({
        name: '',
        amount: '',
        currency: ''
    });

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
            setData(response.data.data)
            toast.success('The product has been published successfully.')
        }).catch(error => {
            toast.error('Publishing of the product failed.')
            console.log(error.response)
        });
    }

    const createPrice = () => {
        Request.createPrice4Product(slug, requestBody).then((response) => {
            setData(response.data.data)
            handleClose();
            toast.success('New price is added.')
        }).catch(error => {
            toast.error('Adding new price failed.')
            console.log(error.response)
        });
    }

    const deletePrice = (price_data) => {
        const _prices = data.prices.filter(each => each._id !== price_data._id);
        Request.deletePrice4Product(slug, { newPrices: _prices }).then((response) => {
            setData(response.data.data);
            toast.success('Selected price is deleted.')
        }).catch(error => {
            toast.error('Deleting price failed.')
            console.log(error.response)
        });
    }

    const copyClipboard = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_API_URL + '/product/public/' + slug);
    }

    const navigate2public = () => {

    }

    return (
        <ApexChartWrapper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card style={style} >
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label='Name' placeholder='input name here...'
                                value={requestBody.name}
                                onChange={(event) => { setRequestBody({ ...requestBody, name: event.target.value }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label='amount' placeholder='input amount here...'
                                value={requestBody.amount} type='number'
                                onChange={(event) => { setRequestBody({ ...requestBody, amount: event.target.value }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Currency</InputLabel>
                                <Select label='Currency' fullWidth value={requestBody.currency}
                                    onChange={(event) => { setRequestBody({ ...requestBody, currency: event.target.value }) }} >
                                    <MenuItem value={'USD'}>USD</MenuItem>
                                    <MenuItem value={'EUR'}>EUR</MenuItem>
                                    <MenuItem value={'GBP'}>GBP</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} onClick={createPrice}>
                            <Button variant='contained'>Create</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>

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
                                    <Typography sx={{ my: 1, color: 'primary.main' }}>
                                        Project : {data.business?.title}
                                    </Typography>
                                </CardContent>
                                <CardActions className='card-action-dense'>
                                    <Button fullWidth variant='contained' sx={{ width: "200px" }} onClick={copyClipboard} disabled={!data.published}>
                                        <ContentCopy sx={{ mr: 2 }} />
                                        Copy
                                    </Button>
                                    <Button fullWidth variant='contained' sx={{ width: "200px" }} onClick={navigate2public} disabled={!data.published}>
                                        <EyeOutline sx={{ mr: 2 }} />  See public view
                                    </Button>
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
                            <Button fullWidth variant='contained' sx={{ width: "300px", backgroundColor: "primary.main", m: 2 }} onClick={handleOpen}>
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
                                    {data?.prices?.map((row, key) => (
                                        <TableRow hover key={key} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                            <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.currency}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={'Delete'}
                                                    color='error'
                                                    onClick={() => { deletePrice(row); }}
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
