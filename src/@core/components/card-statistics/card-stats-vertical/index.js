// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router';

const CardStatsVertical = props => {
  // ** Props
  const { id, subtitle, color, icon, stats, topLetter, toUrl } = props
  const router = useRouter();

  return (

    <Card style={{ width: "100%" }}>
      <Button style={{ width: "100%" }} onClick={() => { router.push(toUrl) }}>
        <CardContent style={{ width: "100%" }}>


          <Box sx={{ display: 'flex', marginBottom: 5.5, alignItems: 'flex-start', justifyContent: 'space-between', }}>
            <Avatar sx={{ boxShadow: 3, marginRight: 4, color: 'common.white', backgroundColor: `${color}.main` }}>
              {icon}
            </Avatar>
            {topLetter}
          </Box>

          <Box sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', marginBottom: 1.5, width: "100%" }}>
            <Typography variant='h6' >
              {stats}
            </Typography>
          </Box>
          <Box sx={{ marginTop: 1.5, display: 'flex', flexWrap: 'wrap', width: "100%" }}>
            <Typography variant='caption'>{subtitle}</Typography>
          </Box>


        </CardContent>
      </Button>
    </Card>

  )
}

export default CardStatsVertical

CardStatsVertical.defaultProps = {
  color: 'primary',
  trend: 'positive'
}
