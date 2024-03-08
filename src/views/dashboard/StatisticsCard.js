// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import { AccountGroup, WalletOutline } from 'mdi-material-ui'

const renderStats = (data) => {
  return [
    {
      title: 'Customers', value: data?.customers?.length,
      color: 'primary',
      icon: <AccountGroup sx={{ fontSize: '1.75rem' }} />
    },
    {
      title: 'Members', value: data?.members?.length,
      color: 'success',
      icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
    },
    {
      title: 'Products', value: data?.products?.length,
      color: 'warning',
      icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
    },
    {
      title: 'Wallets', value: data?.wallets?.length,
      color: 'info',
      icon: <WalletOutline sx={{ fontSize: '1.75rem' }} />
    },
  ].map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.value}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = ({ data }) => {
  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Your project state
            </Box>
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats(data)}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
