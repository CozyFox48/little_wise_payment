import { AuthGuard } from 'src/@core/guards/auth-guard';

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard requireAuth={true}>
    <Component {...props} />
  </AuthGuard>
);
