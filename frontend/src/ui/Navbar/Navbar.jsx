import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useCurrUser } from "../../hooks/useCurrUser";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const { data: user, isLoading } = useCurrUser();

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navContainer}`}>
        <ul className={styles.list}>
          <img src="/logo-light.svg" className={styles.logoImg} />
          <li>
            <NavLink to="/app/dashboard">POČETNA</NavLink>
          </li>
          <li>
            <NavLink to="/app/catalog">TRAŽI OGLASE</NavLink>
          </li>
        </ul>
        <ul className={styles.list}>
          <li>
            <NavLink to="/app/create-post">
              <img src="/plus.svg" />
              Objavi
            </NavLink>
          </li>

          <li>
            {!isLoading && user && (
              <NavLink to="/app/me">
                <img src="/user-sm.svg" />
                Profil
              </NavLink>
            )}
            {!isLoading && !user && <NavLogin />}
          </li>
        </ul>
      </div>

      <MobileNav isLoading={isLoading} user={user} NavLogin={NavLogin} />
    </nav>
  );
}

function NavLogin() {
  const navigate = useNavigate();
  return (
    <button className={styles.navLogin} onClick={() => navigate("/login")}>
      PRIJAVI SE
    </button>
  );
}
