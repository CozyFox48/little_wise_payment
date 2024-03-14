// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';

// ** Icons Imports
import { useSettings } from 'src/@core/hooks/useSettings';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import toast from 'react-hot-toast';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import InvoiceModal from 'src/@core/components/Invoice-modal';
import Request from 'src/request';
import ProjectLayout from "src/layouts/ProjectLayout";
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

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
    const { settings, saveSettings } = useSettings();
    const [data, setData] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [requestBody, setRequestBody] = useState({
        email: ''
    });

    useEffect(() => {
        Request.getCustomer(settings.selectedProject).then((response) => {
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const createCustomer = () => {
        Request.createCustomer(requestBody, settings.selectedProject).then((response) => {
            setOpen(false);
            setData(response.data.data);
            toast.success('A new customer created successfully.');
        }).catch(error => {
            console.log(error.response);
            toast.error('Failed to create new customer.');
        });
    }

    const deleteMember = (member_id) => {
        Request.deleteCustomer({ id: member_id }, settings.selectedProject).then((response) => {
            toast.success('Selected Customer Deleted Successfully');
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response.message);
            toast.error('Failed to delete.');
        });
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
                                fullWidth label='Email' placeholder='email name here...'
                                value={requestBody.email}
                                onChange={(event) => { setRequestBody(prev => { return { ...prev, email: event.target.value } }) }} />
                        </Grid>
                        <Grid item xs={12} onClick={createCustomer}>
                            <Button variant='contained'>Create</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4'>All Customers</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleOpen}>
                        Create New
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <TableContainer>
                            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Invoice</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map(row => (
                                        <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                            <TableCell >
                                                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row?.username}</Typography>
                                            </TableCell>
                                            <TableCell>{row?.email}</TableCell>
                                            <TableCell>
                                                <InvoiceModal destination={row.wallet}>
                                                    <Chip
                                                        label={"Send Invoice"}
                                                        color={"info"}
                                                        sx={{
                                                            height: 24,
                                                            fontSize: '0.75rem',
                                                            textTransform: 'capitalize',
                                                            '& .MuiChip-label': { fontWeight: 500 }
                                                        }}
                                                    >
                                                    </Chip>
                                                </InvoiceModal>

                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={"Delete"}
                                                    onClick={() => deleteMember(row?._id)}
                                                    color={"error"}
                                                    sx={{
                                                        height: 24,
                                                        fontSize: '0.75rem',
                                                        textTransform: 'capitalize',
                                                        '& .MuiChip-label': { fontWeight: 500 }
                                                    }}
                                                >
                                                </Chip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        </ApexChartWrapper>
    )
}
Dashboard.getLayout = page => <ProjectLayout>{page}</ProjectLayout>

export default Dashboard
