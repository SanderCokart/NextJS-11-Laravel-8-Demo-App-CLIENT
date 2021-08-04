import Input from '@/components/Input';
import {useApi} from '@/providers/ApiProvider';
import styles from '@/styles/ForgotPassword.module.scss';
import Head from 'next/head';
import {ChangeEvent, FC, FormEvent, useState} from 'react';


export const ForgotPassword: FC = () => {
  const api = useApi();

  const [email, setEmail] = useState('');


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.post('/forget-password', {email})
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
      <div className={styles.outerContainer}>
        <Head>
          <title>Demo App | Forgot Password</title>
          <meta name="description" content="Reset your password"/>
        </Head>

        <div className={styles.innerContainer}>
          <header>
            <h1>Forgot your password?</h1>
          </header>

          <main>
            <form noValidate onSubmit={onSubmit}>
              <Input label="E-Mail" name="email" type="email" value={email} inputProps={{onChange: onChange}}/>
              <button type="submit">Request new password</button>
            </form>
          </main>
        </div>
      </div>
  );
};

export default ForgotPassword;
