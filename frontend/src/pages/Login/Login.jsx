import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { usePreventAccess } from "../../hooks/usePreventAccess";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = usePreventAccess();
  const { mutate, isLoggingIn } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    if (!password || !email) return;
    mutate({ email, password });
  }

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.interfaceWrapper}>
      {isLoggingIn && <Spinner />}
      {!isLoggingIn && (
        <form className={styles.loginForm} onSubmit={(e) => handleLogin(e)}>
          <div className={styles.headingWrapper}>
            <h2>Prijava</h2>
            <h3>Popunite lične podatke</h3>
          </div>

          <div>
            <label htmlFor="email">Email adresa</label>
            <input
              type="email"
              placeholder="novak@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span>
            Nemate postojeći račun? <Link to="/register">Registruj se</Link>
          </span>
          <button>PRIJAVI SE</button>
        </form>
      )}
    </div>
  );
}
