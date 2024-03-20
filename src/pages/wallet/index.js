import { useAuthContext } from 'src/@core/context/auth-context';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import DashboardLayout from "src/layouts/DashboardLayout";
import Wallet from "src/@core/components/wallet";

const AccountSettings = () => {
  const { user } = useAuthContext();

  return (
    <Wallet id={user.wallet}></Wallet>
  )
}

AccountSettings.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default AccountSettings
