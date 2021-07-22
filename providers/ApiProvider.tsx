import axios, {AxiosInstance} from 'axios';
import {createContext, FC, useEffect, useState} from 'react';

export const ApiContext = createContext({} as AxiosInstance);


export const ApiProvider: FC = ({children}) => {
  const [loading, setLoading] = useState(true);


  const axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
  });

  useEffect(() => {
    axiosInstance.get('/sanctum/csrf-cookie')
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          alert('Could not get CSRF cookie!');
        });
  }, []);

  return !loading ?
      <ApiContext.Provider value={axiosInstance}>
        {children}
      </ApiContext.Provider> : null;

};


export default ApiProvider;
