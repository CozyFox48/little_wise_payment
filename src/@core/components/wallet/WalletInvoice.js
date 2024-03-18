

import CardContent from '@mui/material/CardContent'

import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Chip from '@mui/material/Chip'
import TableContainer from '@mui/material/TableContainer'
import { ArrowRight, ArrowLeft } from 'mdi-material-ui'

const TabSecurity = ({ invoices, data, setValue, setRequestBody }) => {

  const payaction = (row) => {
    console.log(row);
    setRequestBody({
      amount: row.amount,
      type: row.type.toLowerCase(),
      receiver: row.opponent,
      currency: row.currency
    });
    setValue('send');
  }

  return (

    <CardContent sx={{ paddingBottom: 0 }}>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Account Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Is paid?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((row, key) => (
              <TableRow hover key={key} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell >
                  {row.sender === data._id ? <ArrowRight sx={{ color: 'red' }} /> : <ArrowLeft sx={{ color: 'green' }} />}
                </TableCell>
                <TableCell> {row.type} </TableCell>
                <TableCell>{row.sender === data._id ? row.receiver : row.sender}</TableCell>
                <TableCell> {row.desc} </TableCell>
                <TableCell>     {row.amount}   </TableCell>
                <TableCell>   {row.currency}  </TableCell>
                <TableCell>
                  {row.payment ? 'Paid' : row.sender !== data._id ?
                    <Chip
                      label={"Pay"}
                      color={"success"}
                      onClick={() => payaction(row)}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    >
                    </Chip> : ''}  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  )
}

export default TabSecurity
