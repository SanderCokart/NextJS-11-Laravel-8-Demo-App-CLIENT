import {useAuth} from '@/providers/AuthProvider';
import {FC, MouseEvent} from 'react';

export const Dashboard: FC = () => {
  const {logout} = useAuth();

  const onLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
  };

  return (
      <div>
        <h1>Dashboard</h1>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
  );
};

export default Dashboard;
