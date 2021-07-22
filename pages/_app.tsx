import ApiProvider from '@/p/ApiProvider';
import UserProvider from '@/p/UserProvider';
import type {AppProps} from 'next/app';
import '../styles/globals.css';

function MyApp({Component, pageProps}: AppProps) {
  return (
      <ApiProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ApiProvider>
  );
}

export default MyApp;
