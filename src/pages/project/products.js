import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react';
import { Publish, PublishOff } from 'mdi-material-ui'
import { useSettings } from 'src/@core/hooks/useSettings';
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Request from 'src/request';
import ProjectLayout from "src/layouts/ProjectLayout";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

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

const categories = {
    "Retail": [
        "Clothing",
        "Electronics",
        "Home and Garden",
        "Sports and Fitness",
        "Jewelry",
        "Books and Magazines"
    ],
    "Food and Beverage": [
        "Restaurants",
        "Cafes",
        "Bakeries",
        "Bars and Pubs",
        "Food Trucks",
        "Groceries"
    ],
    "Services": [
        "Professional Services",
        "Consulting",
        "Healthcare",
        "Beauty and Wellness",
        "Education and Training",
        "Repair and Maintenance"
    ],
    "Online": [
        "E-commerce",
        "Digital Products",
        "Software and Apps",
        "Web Development",
        "Online Services",
        "Marketplace"
    ],
    "Entertainment": [
        "Event Management",
        "Art and Culture",
        "Amusement and Recreation",
        "Music and Performing Arts",
        "Gaming and Esports",
        "Movies and Theater"
    ]
}
const types = ["Retail", "Food and Beverage", "Services", "Online", "Entertainment"]

const Dashboard = () => {
    const { settings } = useSettings();
    const [data, setData] = useState([])

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);

    const [requestBody, setRequestBody] = useState({
        name: '',
        summary: '',
        category: '',
        type: ''
    });

    useEffect(() => {
        Request.get4OneBusiness(settings.selectedProject).then((response) => {
            console.log(response.data.data)
            setData(response.data.data);
        }).catch(error => {
            console.log(error.response)
        });
    }, [])

    const createWallet = () => {
        Request.createProduct(settings.selectedProject, requestBody).then((response) => {
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
                                fullWidth label='Name' placeholder='input name here...'
                                value={requestBody.name}
                                onChange={(event) => { setRequestBody({ ...requestBody, name: event.target.value }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth label='Summary' placeholder='input summary here...'
                                multiline rows={4}
                                value={requestBody.summary}
                                onChange={(event) => { setRequestBody({ ...requestBody, summary: event.target.value }) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Type</InputLabel>
                                <Select label='Type' fullWidth value={requestBody.type}
                                    onChange={(event) => { setRequestBody({ ...requestBody, type: event.target.value }) }} >
                                    {types.map((each, key) => <MenuItem value={each} key={key}>{each}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select label='Category' fullWidth value={requestBody.category}
                                    onChange={(event) => { setRequestBody({ ...requestBody, category: event.target.value }) }} >
                                    {categories[requestBody.type]?.map((each, key) => <MenuItem value={each} key={key}>{each}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} onClick={createWallet}>
                            <Button variant='contained'>Create</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Modal>

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Typography variant='h4'>All Products</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='contained' onClick={handleOpen}>
                        Create New
                    </Button>
                </Grid>
                {data?.map((each, key) =>
                    <Grid item xs={6} md={3} key={key}>
                        <CardStatisticsVerticalComponent
                            stats={each.name}
                            id={each._id}
                            icon={each.published ? <Publish /> : <PublishOff />}
                            color={each.published ? 'success' : 'error'}
                            subtitle={each.category}
                            topLetter={each.published ? 'Published' : 'Unpublished'}
                            toUrl={'/product/' + each._id}
                        />
                    </Grid>
                )}
            </Grid>
        </ApexChartWrapper>
    )
}
Dashboard.getLayout = page => <ProjectLayout>{page}</ProjectLayout>

export default Dashboard
