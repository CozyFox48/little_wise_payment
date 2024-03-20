import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import VerticalLayout from 'src/@core/layouts/VerticalLayout';
import VerticalNavItems from 'src/navigation/vertical';
import VerticalAppBarContent from './components/vertical/AppBarContent';
import { useSettings } from 'src/@core/hooks/useSettings';
import { withoutAuthGuard } from 'src/@core/hocs/without-auth-guard';

const UserLayout = withoutAuthGuard(({ children }) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const UpgradeToProImg = () => {
    return (
      <Box sx={{ mx: 'auto' }}>
        <a
          target='_blank'
          rel='noreferrer'
          href='https://themeselection.com/products/materio-mui-react-nextjs-admin-template/'
        >
          <img width={230} alt='upgrade to premium' src={`/images/misc/upgrade-banner-${settings.mode}.png`} />
        </a>
      </Box>
    )
  }

  return (
    <VerticalLayout
      hidden={hidden}
      isSidebar={false}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      afterVerticalNavMenuContent={UpgradeToProImg}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      {children}
      {/* <UpgradeToProButton /> */}
    </VerticalLayout>
  )
})

export default UserLayout
