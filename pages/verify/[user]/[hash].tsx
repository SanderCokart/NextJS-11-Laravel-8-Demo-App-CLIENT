import useApi from '@/h/useApi';
import styles from '@/s/verify/[user]/[hash].module.scss';
import {useRouter} from 'next/router';
import {FC, useEffect} from 'react';

export const VerifyEmail: FC = () => {
  const router = useRouter();
  const api = useApi();

  const {query: {user, hash, expires, signature}, isReady} = router;

  useEffect(() => {
    if (isReady) {
      api.get(`/email/verify/${user}/${hash}?expires=${expires}&signature=${signature}`)
          .then((res) => {
            if (res.status = 200) {
              setTimeout(() => {
                router.push('/dashboard');
              }, 200)
            }
          })
          .catch(err => {
            console.log(err);
          });
    }
  }, []);


  return (
      <div className={styles.container}>
        <h1>Email Verified</h1>
        <p>You will be redirected to the dashboard shortly!</p>
      </div>
  );
};

export default VerifyEmail;
