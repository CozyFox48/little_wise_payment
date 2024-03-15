
import { useEffect, useState } from 'react'
import CardContent from '@mui/material/CardContent'
import Request from "src/request";
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { ArrowRight, ArrowLeft } from 'mdi-material-ui'

const TabSecurity = ({ data }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    console.log(data._id);
    Request.getTrans(data._id).then(response => {
      setTransactions(response.data.data)
    }).catch(error => {
      console.log(error.response)
    })
  }, [data])

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
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell >
                  {row.sender === data._id ? <ArrowRight sx={{ color: 'red' }} /> : <ArrowLeft sx={{ color: 'green' }} />}
                </TableCell>
                <TableCell> {row.type} </TableCell>
                <TableCell>{row.sender === data._id ? row.receiver : row.sender}</TableCell>
                <TableCell> {row.desc} </TableCell>
                <TableCell>     {row.amount}   </TableCell>
                <TableCell>   {row.currency}  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  )
}

export default TabSecurity
