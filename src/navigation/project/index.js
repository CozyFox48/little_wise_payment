import HomeOutline from 'mdi-material-ui/HomeOutline'
import { AccountGroup, WalletOutline, AccountOutline, CellphoneLink } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Overview',
      icon: HomeOutline,
      path: '/project/overview'
    },
    {
      title: 'Wallets',
      icon: WalletOutline,
      path: '/project/wallets'
    },
    {
      title: 'Members',
      icon: AccountOutline,
      path: '/project/members'
    },
    {
      title: 'Products',
      icon: CellphoneLink,
      path: '/project/products'
    },
    {
      title: 'Customers',
      icon: AccountGroup,
      path: '/project/customers',
    }
  ]
}

export default navigation
