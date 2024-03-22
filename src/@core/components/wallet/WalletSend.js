import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import toast from 'react-hot-toast';
import Request from "src/request";
import { useSettings } from 'src/@core/hooks/useSettings';

const TabInfo = ({ requestBody, setRequestBody, data, getData }) => {
  const { settings } = useSettings();

  const sendMoney = () => {
    let flag = false;
    data.balance.forEach(each => {
      if (each.currency === requestBody.currency && requestBody.amount > each.amount) {
        toast.error('The balance has been exceeded.');
        flag = true;
      }
    })

    if (!flag) {
      if (requestBody.amount <= 0) {
        toast.error(`Amount can't be 0 or less than 0.`)
      } else if (requestBody.receiver === '') {
        toast.error(`Please input receiver's name.`)
      } else {
        Request.createTrans({ ...requestBody, business: settings.selectedProject, sender: data._id }).then((response) => {
          toast.success('Sent money successfully.');
          getData();
          setRequestBody({
            amount: 0,
            type: 'user',
            receiver: '',
            currency: 'USD',
            invoice: null
          });
        }).catch(error => {
          console.log(error.response);
          toast.error('Failed to send money.');
        });
      }
    }

  }

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <FormControl>
              <FormLabel sx={{ fontSize: '0.875rem' }}>Receiver type</FormLabel>
              <RadioGroup row aria-label='receiver' name='account-settings-info-radio' value={requestBody.type}
                onChange={(event) => { setRequestBody(prev => { return { ...prev, type: event.target.value } }) }}>
                <FormControlLabel value='user' label='Individual' control={<Radio />} />
                <FormControlLabel value='business' label='Business' control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth label='Receiver Name' placeholder='receiver name here...'
              value={requestBody.receiver}
              onChange={(event) => { setRequestBody(prev => { return { ...prev, receiver: event.target.value } }) }} />
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
              fullWidth label='Amount' placeholder='amount here...'
              value={requestBody.amount}
              type='number'
              onChange={(event) => { setRequestBody(prev => { return { ...prev, amount: event.target.value } }) }} />
          </Grid>
          <Grid item xs={12}>{requestBody.invoice ? 'This is payment for invoice' : ''}</Grid>

          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={sendMoney}>
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
