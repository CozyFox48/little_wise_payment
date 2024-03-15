// ** React Imports
import { useState } from 'react'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { CurrencyEur, CurrencyUsd, CurrencyGbp, CheckBold, CloseThick } from 'mdi-material-ui'

const currencyIconList = {
  "EUR": <CurrencyEur />,
  "USD": <CurrencyUsd />,
  "GBP": <CurrencyGbp />
}

const TabAccount = ({ data, setData, updateData }) => {
  const [selectCurrency, setSelectCurrency] = useState('');

  return (
    <CardContent>
      <Grid container spacing={7}>
        {data?.balance?.map((each, key) =>
          <Grid item xs={12} md={6} lg={4} key={key}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `success.main` }}>
                    {currencyIconList[each.currency]}
                  </Avatar>
                  <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                    <DotsVertical />
                  </IconButton>
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '1.5rem' }}>{each.currency}</Typography>
                {selectCurrency === each.currency ?
                  <Box display="flex">
                    <FormControl fullWidth sx={{ marginTop: 1.5 }}>
                      <InputLabel htmlFor='setCurrencyAmount'>Set Amount</InputLabel>
                      <OutlinedInput
                        label='Set Amount'
                        type="number"
                        id='setCurrencyAmount'

                        value={each.amount}
                        onChange={event => {
                          setData(prev => {
                            const newData = { ...prev }
                            newData.balance[key].amount = Number(event.target.value);

                            return newData
                          })
                        }}
                      />
                    </FormControl>
                    <Button onClick={() => { updateData(); setSelectCurrency(''); }}><CheckBold /></Button>
                    <Button onClick={() => { setSelectCurrency('') }}><CloseThick /></Button>
                  </Box>

                  :
                  <Button sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', marginBottom: 1.5, alignItems: 'flex-start', width: "100%" }}
                    onClick={() => { setSelectCurrency(each.currency) }}>
                    <Typography variant='h4' sx={{ mr: 2, width: '100%' }}>
                      {each.amount}
                    </Typography>
                  </Button>}


              </CardContent>
            </Card>
          </Grid>
        )}

      </Grid>
    </CardContent>
  )
}

export default TabAccount
