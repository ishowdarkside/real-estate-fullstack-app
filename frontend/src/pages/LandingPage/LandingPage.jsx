import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.landingPage}>
      <h1>Mojdom</h1>
      <h2>Vaša savršena nekretnina, na dohvat ruke.</h2>
      <div>
        <button>POGLEDAJ OGLASE</button>
        <button onClick={() => navigate("/register")}>REGISTRUJ SE</button>
      </div>
    </div>
  );
}
