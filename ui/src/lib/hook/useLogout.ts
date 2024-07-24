import { handleLogout } from '@/utils/handleLogout';
import { useCustomRouter } from './useCustomRouter';

export const useLogout = () => {
  const { navigateTo } = useCustomRouter();
  const logout = () => {
    handleLogout();
    navigateTo('/login');
  };

  return { logout };
};
