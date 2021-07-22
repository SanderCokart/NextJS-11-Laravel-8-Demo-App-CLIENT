import styles from '@/s/SignUp.module.scss';
import Head from 'next/head';
import Input from '@/c/Input';
import { RegisterCredentials } from '@/t/Credentials';
import { useState } from 'react';
import useApi from '@/h/useApi';
import { useRouter } from 'next/router';

export default function SignUp() {
    const [credentials, setCredentials] = useState<RegisterCredentials>({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const api = useApi();
    const router = useRouter();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials((prevState) => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        })
    }

    const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        api.post('/sign-up', credentials)
            .then(res => {
                console.log(res);
                router.push('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className={styles.outerContainer}>
            <Head>
                <title>Demo App | Login</title>
                <meta name="description" content="Create a new account or sign in." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.innerContainer}>
                <header>
                    <h1>Sign Up</h1>
                </header>

                <main>
                    <form noValidate onSubmit={onSubmit}>
                        <Input label="Full Name" name="name" type="text" value={credentials.name} inputProps={{ onChange: onChange }} />
                        <Input label="E-Mail" name="email" type="email" value={credentials.email} inputProps={{ onChange: onChange }} />
                        <Input label="Password" name="password" type="password" value={credentials.password} inputProps={{ onChange: onChange }} />
                        <Input label="Password Confirmation" name="password_confirmation" type="password" value={credentials.password_confirmation} inputProps={{ onChange: onChange }} />
                        <button type="submit">Sign Up</button>
                    </form>
                </main>
            </div>
        </div>
    );
}