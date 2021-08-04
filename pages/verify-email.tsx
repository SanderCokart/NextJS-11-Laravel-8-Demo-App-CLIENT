import useApi from '@/hooks/useApi';
import useAuth from '@/hooks/useAuth';
import styles from '@/styles/verify/[user]/[hash].module.scss';
import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

export const VerifyEmail: FC = () => {
  const router = useRouter();
  const api = useApi();
  const {state} = useAuth();
  const email_verified_at = state.user === 'guest' ? 'guest' : state.user.email_verified_at;

  const {query: {user, hash, expires, signature}, isReady} = router;

  const timeOutAction = () => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 3000);
  };

  useEffect(() => {
    if (isReady && !email_verified_at) {
      api.get(`/email/verify/${user}/${hash}?expires=${expires}&signature=${signature}`)
          .then((res) => {
            if (res.status === 200) timeOutAction();
          })
          .catch(err => {
            console.log(err);
          });
    } else {
      timeOutAction();
    }
  }, []);


  if (email_verified_at)
    return (
        <div className={styles.container}>
          <h1>Email has already been verified!</h1>
          <p>You will be redirected to the dashboard shortly!</p>
        </div>
    );

  return (
      <div className={styles.container}>
        <h1>Email Verified</h1>
        <p>You will be redirected to the dashboard shortly!</p>
      </div>
  );
};

export default VerifyEmail;
