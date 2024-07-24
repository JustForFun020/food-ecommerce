import { useRouter } from 'next/navigation';

export const useCustomRouter = () => {
  const router = useRouter();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  return { navigateTo };
};
