import useMediaQuery from '@mui/material/useMediaQuery';
import VerticalLayout from 'src/@core/layouts/VerticalLayout';
import VerticalNavItems from 'src/navigation/project';
import { withAuthGuard } from 'src/@core/hocs/with-auth-guard';
import VerticalAppBarContent from './components/vertical/AppBarContent';
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
