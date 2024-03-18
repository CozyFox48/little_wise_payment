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
import { Send, SwapHorizontal, Invoice } from 'mdi-material-ui'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Demo Tabs Imports
import WalletSend from 'src/@core/components/wallet/WalletSend'
import TabAccount from 'src/@core/components/wallet/WalletAccount'
import WalletTran from 'src/@core/components/wallet/WalletTran'
import WalletInvoice from 'src/@core/components/wallet/WalletInvoice'
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
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const [requestBody, setRequestBody] = useState({
    amount: 0,
    type: 'user',
    receiver: '',
    currency: 'USD'
  });

  useEffect(() => {
    if (data._id) {
      Request.getTrans(data._id).then(response => {
        setTransactions(response.data.data)
      }).catch(error => {
        console.log(error.response)
      });
    }

  }, [data]);

  useEffect(() => {
    if (data._id) {
      Request.getInvoices(data._id).then(response => {
        setInvoices(response.data.data)
      }).catch(error => {
        console.log(error.response)
      });
    }
  }, [data]);

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

  const getData = () => {
    Request.getOneWallet(id).then((response) => {
      setData(response.data.data);
    }).catch(error => {
      console.log(error.response)
    })
  }
  useEffect(() => {
    getData();
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
                <SwapHorizontal />
                <TabName>Transaction</TabName>
              </Box>
            }
          />
          <Tab
            value='invoice'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Invoice />
                <TabName>Invoices</TabName>
              </Box>
            }
          />
          <Tab
            value='send'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Send />
                <TabName>Send</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount data={data} setData={setData} updateData={updateData} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='transaction'>
          <WalletTran transactions={transactions} data={data} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='invoice'>
          <WalletInvoice invoices={invoices} data={data} setValue={setValue} setRequestBody={setRequestBody} />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='send'>
          <WalletSend requestBody={requestBody} setRequestBody={setRequestBody} data={data} getData={getData} />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

AccountSettings.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AccountSettings
