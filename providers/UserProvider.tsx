import useApi from '@/h/useApi';
import {Credentials} from '@/t/Credentials';
import User from '@/t/User';
import {createContext, FC, useState} from 'react';


export interface Context {
  user: User,
  login: (credentials: Credentials) => void
}

export const UserContext = createContext({} as Context);

export const UserProvider: FC = ({children}) => {
  const [user, setUser] = useState({} as User);
  const api = useApi();

  const login = (credentials: Credentials) => {
    api.post('/login', credentials)
        .then(res => {
          setUser(res.data.user);
        })
        .catch(err => {
          console.error(err);
        });
  };

  return (
      <UserContext.Provider value={{user, login}}>{children}</UserContext.Provider>
  );
};


export default UserProvider;
