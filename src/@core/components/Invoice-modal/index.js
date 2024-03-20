// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';

import { useSettings } from 'src/@core/hooks/useSettings';
import Card from '@mui/material/Card'
import toast from 'react-hot-toast';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Request from 'src/request';
import ProjectLayout from "src/layouts/ProjectLayout";
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'

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

const Dashboard = ({ children, destination }) => {
    const { settings } = useSettings();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [requestBody, setRequestBody] = useState({
        amount: 0,
        description: '',
        currency: 'USD'
    });

    const createInvoice = () => {
        if (requestBody.amount === 0) {
            toast.error(`Amount can't be 0.`)
        } else if (requestBody.description === '') {
            toast.error(`Please input description.`)
        } else {
            Request.createInvoice({ ...requestBody, business: settings.selectedProject, receiver: destination }).then((response) => {
                setOpen(false);
                toast.success('A new invoice created successfully.');
            }).catch(error => {
                console.log(error.response);
                toast.error('Failed to create new invoice.');
            });
        }

    }

    return (
        <div>
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
                                fullWidth label='Amount' placeholder='amount here...'
                                value={requestBody.amount}
                                type='number'
                                onChange={(event) => { setRequestBody(prev => { return { ...prev, amount: event.target.value } }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Currency</InputLabel>
                                <Select label='Currency' fullWidth value={requestBody.currency}
                                    onChange={(event) => { setRequestBody(prev => { return { ...prev, currency: event.target.value } }) }}>
                                    <MenuItem value='USD'>USD</MenuItem>
                                    <MenuItem value='GBP'>GBP</MenuItem>
                                    <MenuItem value='EUR'>EUR</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label='Description' placeholder='description name here...'
                                rows={4} multiline
                                value={requestBody.description}
                                onChange={(event) => { setRequestBody(prev => { return { ...prev, description: event.target.value } }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' onClick={createInvoice}>Create</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>
            <div onClick={handleOpen}>
                {children}
            </div>
        </div>
    )
}
Dashboard.getLayout = page => <ProjectLayout>{page}</ProjectLayout>

export default Dashboard
