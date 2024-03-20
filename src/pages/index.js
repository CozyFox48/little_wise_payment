// ** MUI Imports
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import DashboardLayout from "src/layouts/DashboardLayout";
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Request from "src/request";
import TextField from '@mui/material/TextField'
import { useSettings } from 'src/@core/hooks/useSettings';
import { useRouter } from 'next/router';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import toast from 'react-hot-toast';

const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

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
  const { saveSettings } = useSettings();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ title: '', description: '' })
  const [businesses, setBussinesses] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const getBusiness = () => {
    Request.getBusiness().then((response) => {
      setBussinesses(response.data.data)
    }).catch(error => {
      console.log(error.response.data.message)
      toast.error('Fetching businesses failed.')
    });
  }

  useEffect(() => {
    getBusiness();
  }, [])

  const createBusiness = () => {
    Request.createBusiness(data).then((response) => {
      setOpen(false);
      setBussinesses(response.data.data);
      toast.success('You created business successfully.')
    }).catch(error => {
      if (error.response.data.message.includes('duplicate')) {
        toast.error('Error, duplicated business name.')
      } else {
        toast.error('Creating new business failed.')
      }
    });
  }

  const navigate = (each) => {
    saveSettings(prev => {
      return {
        ...prev,
        selectedProject: each._id
      }
    });
    router.push('/project/overview');
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
                fullWidth label='Title' placeholder='business title here...'
                value={data.title}
                onChange={() => { setData(prev => { return { ...prev, title: event.target.value } }) }} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Description' placeholder='business description here' multiline rows={4}
                value={data.description}
                onChange={() => { setData(prev => { return { ...prev, description: event.target.value } }) }}
              />
            </Grid>
            <Grid item xs={12} onClick={createBusiness}>
              <Button variant='contained'>Create</Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h4'>All Projects</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' onClick={handleOpen}>
            Create New
          </Button>
        </Grid>
        {businesses.map((each, key) =>
          <Grid item xs={12} md={4} key={key}>
            <Card sx={{ position: 'relative', height: '200px' }}>
              <CardContent>
                <Typography variant='h6' sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>{each.title}</Typography>
                <Typography variant='body2' sx={{ letterSpacing: '0.25px', overflow: "hidden", textOverflow: "ellipsis" }}>
                  {each.description}
                </Typography>
                <Typography variant='h5' sx={{ my: 4, color: 'primary.main' }}>
                  Products : {each.products.length}
                </Typography>
                <Button size='small' variant='contained' onClick={() => {
                  navigate(each);
                }}>
                  View Detail
                </Button>
                <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
              </CardContent>
            </Card>
          </Grid>
        )}

      </Grid>
    </ApexChartWrapper>
  )
}
Dashboard.getLayout = page => <DashboardLayout>{page}</DashboardLayout>

export default Dashboard
