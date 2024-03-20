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
  height: 670,
  position: 'absolute'
})


const Trophy = ({ data }) => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h4'>{data?.title}</Typography>
        <Typography variant='h6' sx={{ my: 1, letterSpacing: '0.25px', textWrap: 'nowrap', wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>
          {data?.description}
        </Typography>
        <Typography variant='h6' sx={{ my: 1, color: 'primary.main' }}>
          Owner : {data?.owner?.username}
        </Typography>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
      </CardContent>
    </Card>
  )
}

export default Trophy
