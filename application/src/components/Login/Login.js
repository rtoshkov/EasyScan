import styles from './Login.module.css';

const Login = () => {
    return (
        <main>
            <section className={styles.loginForm}>
                <article className={styles.loginLogo}>

                </article>
                <article>
                    <form>
                        <h2>Login Page</h2>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" id="username"/>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"/>
                        <button type="submit">Login</button>
                    </form>
                </article>
                <article className={styles.messages}>

                </article>
            </section>
        </main>
    )
}

export default Login;