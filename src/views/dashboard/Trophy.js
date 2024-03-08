// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 98,
  position: 'absolute'
})

const Trophy = ({data}) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h3'>{data?.title}</Typography>
        <Typography variant='h5' sx={{ my: 2, letterSpacing: '0.25px' }}>
          {data?.description}
        </Typography>
        <Typography variant='h5' sx={{ my: 2, color: 'primary.main' }}>
          Owner : {data?.owner?.username}
        </Typography>
        {/* <Button size='small' variant='contained'>
          View Sales
        </Button> */}
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        {/* <TrophyImg alt='trophy' src='/images/misc/trophy.png' /> */}
      </CardContent>
    </Card>
  )
}

export default Trophy
