// ** MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout';
import VerticalNavItems from 'src/navigation/project';
import { withAuthGuard } from 'src/@core/hocs/with-auth-guard';

// ** Component Import
import UpgradeToProButton from './components/UpgradeToProButton';
import VerticalAppBarContent from './components/vertical/AppBarContent';

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings';

const UserLayout = withAuthGuard(({ children }) => {
  const { settings, saveSettings } = useSettings()
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))


  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      isSidebar={true}
      saveSettings={saveSettings}
      verticalNavItems={VerticalNavItems()} // Navigation Items
     
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
