import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Table from '@mui/material/Table'
import Request from 'src/request';
import PublicLayout from "src/layouts/PublicLayout";
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { styled } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useAuthContext } from 'src/@core/context/auth-context';

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
    top: '50%',
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
    const [selected, setSelected] = useState({});
    const { user } = useAuthContext();

    useEffect(() => {
        Request.getProduct4Public(slug).then((response) => {
            setData(response.data.data)
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const selectAction = (row) => {
        setSelected(row);
        setOpen(true);
    }

    const purchaseItem = () => {
        if (user) {
            const wallets = data.business.wallets;
            let receiver = ''
            for (const wallet of wallets) {
                if (wallet.isDefault === true) receiver = wallet.id;
            }
            Request.purchaseProduct({ amount: selected.amount, currency: selected.currency, sender: user?.wallet, receiver: receiver }).then((response) => {
                setOpen(false);
                toast.success('You purchased product successfully.');
            }).catch(error => {
                console.log(error.response)
                if (error.response.status == 401) toast.error('The balance has been exceeded.')
                else toast.error('Purchasing product failed.')

            });
        } else {
            toast.error('You are not logged in. Please log in first.')
        }

    }

    return (
        <ApexChartWrapper>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card style={style} >
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
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Typography sx={{ mr: 0.5, fontSize: '1.3rem', fontWeight: 600, letterSpacing: '0.25px' }}>{selected.name}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', textAlign: 'end', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600, fontSize: '1.275rem', lineHeight: 1.72, letterSpacing: '0.22px' }}>
                                {selected.amount}
                            </Typography>
                            <Typography variant='body' sx={{ lineHeight: 1.5 }}>
                                {selected.currency}
                            </Typography>
                        </Box>
                    </Box>
                    <Grid item xs={12}>
                        <Button variant='contained' onClick={purchaseItem}>Purchase</Button>
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
                            </Grid>
                            <StyledGrid item md={3} xs={12}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' />
                                </CardContent>
                            </StyledGrid>

                        </Grid>

                        <Box sx={{ m: 4 }}>
                            <Typography variant='h6'>
                                Prices
                            </Typography>
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
                                                        label={'Purchase'}
                                                        onClick={() => { selectAction(row) }}
                                                        sx={{
                                                            height: 24,
                                                            backgroundColor: 'primary.main',
                                                            color: 'white',
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
                        </Box>

                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}
Dashboard.getLayout = page => <PublicLayout>{page}</PublicLayout>

export default Dashboard
