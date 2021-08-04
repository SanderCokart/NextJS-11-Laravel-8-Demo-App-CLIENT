import Loader from '@/components/Loader';
import {useAuth} from '@/providers/AuthProvider';
import {useRouter} from 'next/router';
import React, {FC} from 'react';

export const RouteProtector: FC = ({children}) => {
  const {loggedIn, loading} = useAuth();
  const router = useRouter();

  const publicRoutes = ['/login', '/sign-up', '/forgot-password', '/reset-password', '/404'];

  if (loading) {
    return <Loader/>;
  }

  if (!publicRoutes.includes(router.route) && !loggedIn && !loading) {
    router.push('/login');
    return <Loader/>;
  }

  if (publicRoutes
      .includes(router.route) && loggedIn && !loading) {
    router.push('/dashboard');
    return <Loader/>;
  }

  return <>{children}</>;
};

export default RouteProtector;
