import IconButton from '@mui/material/IconButton'
import WalletIcon from 'mdi-material-ui/Wallet';
import Link from 'next/link';

const ModeToggler = () => {

  return (
    <Link href="/wallet">
      <IconButton color='inherit' aria-haspopup='true' >
        <WalletIcon />
      </IconButton>
    </Link>
  )
}

export default ModeToggler
