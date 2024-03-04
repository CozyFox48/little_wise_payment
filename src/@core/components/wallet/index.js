// ** React Imports
import { useEffect, useState, useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import { Sync } from 'mdi-material-ui'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/@core/components/wallet/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

import Request from "src/request";

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import DashboardLayout from "src/layouts/DashboardLayout";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = ({ id }) => {
  
  const [value, setValue] = useState('account');
  const [data, setData] = useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const updateData = () => {
    Request.updateOneWallet(id, data).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error.response)
    })
  }

  useEffect(() => {
    Request.getOneWallet(id).then((response) => {
      setData(response.data.data);
    }).catch(error => {
      console.log(error.response)
    })
  }, []);

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='transaction'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Sync />
                <TabName>Transaction</TabName>
              </Box>
            }
          />
          <Tab
            value='send'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Send</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount data={data} setData={setData} updateData={updateData}/>
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='transaction'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='send'>
          <TabInfo />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

AccountSettings.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AccountSettings
