import { AuthGuard } from 'src/@core/guards/auth-guard';

export const withoutAuthGuard = (Component) => (props) => (
  <AuthGuard requireAuth={false}>
    <Component {...props} />
  </AuthGuard>
);
