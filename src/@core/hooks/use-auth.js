import { useContext } from 'react';
import { AuthContext } from 'src/@core/context/auth-context';

export const useAuth = () => useContext(AuthContext);