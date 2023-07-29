import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className={styles.interfaceWrapper}>
      <form className={styles.loginForm}>
        <div className={styles.headingWrapper}>
          <h2>Prijava</h2>
          <h3>Popunite lične podatke</h3>
        </div>

        <div>
          <label htmlFor="email">Email adresa</label>
          <input type="email" placeholder="novak@gmail.com" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*********" />
        </div>

        <span>
          Nemate postojeći račun? <Link to="/register">Registruj se se</Link>
        </span>
        <button>PRIJAVI SE</button>
      </form>
    </div>
  );
}
