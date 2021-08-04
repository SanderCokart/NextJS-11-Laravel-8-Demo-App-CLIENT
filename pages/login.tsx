import Input from '@/components/Input';
import {useAuth} from '@/providers/AuthProvider';
import styles from '@/styles/Login.module.scss';
import {LoginCredentials} from '@/types/LoginCredentials';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ChangeEvent, FormEvent, useState} from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const router = useRouter();
  const {login} = useAuth();
  const {query} = router;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => {
      return ({
        ...prevState,
        [e.target.name]: e.target.value
      });
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(credentials).then(({status}) => {
      if (status === 200) {
        if (query?.type === 'verify_email')
          return router.push({pathname: '/verify-email', query});
        return router.push('/dashboard');
      }
    });
  };

  return (
      <div className={styles.outerContainer}>
        <Head>
          <title>Demo App | Login</title>
          <meta name="description" content="Create a new account or sign in."/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className={styles.innerContainer}>
          <header>
            <h1>Login</h1>
          </header>

          <main>
            <form noValidate onSubmit={onSubmit}>
              <Input label="E-Mail" name="email" type="email" value={credentials.email} inputProps={{onChange: onChange}}/>
              <Input label="Password" name="password" type="password" value={credentials.password} inputProps={{onChange: onChange}}/>
              <button type="submit">Login</button>
              <div>
                <Link href="/forgot-password">Forgot password?</Link>
                <Link href="/sign-up">No account yet? Sign up!</Link>
              </div>
            </form>
          </main>
        </div>
      </div>
  );
}
