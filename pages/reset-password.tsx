import Input from '@/components/Input';
import useApi from '@/hooks/useApi';
import styles from '@/styles/ForgotPassword.module.scss';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {ChangeEvent, FC, FormEvent, useState} from 'react';

export const ResetPassword: FC = () => {
  const api = useApi();
  const router = useRouter();
  const {query} = router;

  const [form, setForm] = useState({
    password: '',
    password_confirmation: '',
    ...query
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.patch('/reset-password', form)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.error(err);
        });
  };

  return (
      <div className={styles.outerContainer}>
        <Head>
          <title>Demo App | Reset Password</title>
          <meta name="description" content="Reset your password"/>
        </Head>

        <div className={styles.innerContainer}>
          <header>
            <h1>Reset Password</h1>
          </header>

          <main>
            <form noValidate onSubmit={onSubmit}>
              <Input label="Password" name="password" type="password" value={form.password} inputProps={{onChange: onChange}}/>
              <Input label="Password Confirmation" name="password_confirmation" type="password" value={form.password_confirmation} inputProps={{onChange: onChange}}/>
              <button type="submit">Request new password</button>
            </form>
          </main>
        </div>
      </div>
  );
};

export default ResetPassword;
