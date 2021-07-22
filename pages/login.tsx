import Input from '@/c/Input';
import useUser from '@/h/useUser';
import styles from '@/s/Login.module.scss';
import {Credentials} from '@/t/Credentials';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  });

  const router = useRouter();
  const {login} = useUser();
  const {query, isReady} = router;

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
    login(credentials);
    router.query?.type === 'verify_email' ?
        router.push({
          pathname: '/verify/[user]/[hash]',
          query
        })
        :
        router.push('/dashboard');
  };

  useEffect(() => {
    if (isReady) {
      console.log(query);
    }
  }, []);

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
                <Link href="/forgot">Forgot password?</Link>
                <Link href="/sign-up">No account yet? Sign up!</Link>
              </div>
            </form>
          </main>
        </div>
      </div>
  );
}
