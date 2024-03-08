import 'react-datepicker/dist/react-datepicker.css'
import ProjectLayout from "src/layouts/ProjectLayout";
import Wallet from "src/@core/components/wallet";
import { useRouter } from 'next/router';

const AccountSettings = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <Wallet id={slug}></Wallet>
    )
}

AccountSettings.getLayout = page => <ProjectLayout>{page}</ProjectLayout>;

export default AccountSettings
