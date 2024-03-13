// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';

// ** Icons Imports
import { WalletOutline } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings';

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Request from 'src/request';
import ProjectLayout from "src/layouts/ProjectLayout";

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
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
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        console.log(settings.selectedProject);
        Request.getWallets4business(settings.selectedProject).then((response) => {
            console.log(response.data.dat)
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const createWallet = () => {
        Request.createWallet({ nickname: nickname, business_id: settings.selectedProject }).then((response) => {
            setOpen(false);
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response)
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
                                fullWidth label='Name' placeholder='wallet name here...'
                                value={nickname}
                                onChange={(event) => { setNickname(event.target.value) }} />
                        </Grid>
                        <Grid item xs={12} onClick={createWallet}>
                            <Button variant='contained'>Create</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4'>All Wallets</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleOpen}>
                        Create New
                    </Button>
                </Grid>
                {data?.map((each, key) =>
                    <Grid item xs={6} md={3} key={key}>
                        <CardStatisticsVerticalComponent
                            stats={each.id?.nickname || 'Not defined'}
                            id={each.id._id}
                            icon={<WalletOutline />}
                            color={each.isDefault ? 'success' : ''}
                            subtitle={`Pendings : ${each.id.pendings.length}`}
                        />

                    </Grid>
                )}
            </Grid>
        </ApexChartWrapper>
    )
}
Dashboard.getLayout = page => <ProjectLayout>{page}</ProjectLayout>

export default Dashboard
