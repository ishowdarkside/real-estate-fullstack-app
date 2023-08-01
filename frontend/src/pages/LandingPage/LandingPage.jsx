import { useNavigate } from "react-router-dom";
import { usePreventAccess } from "../../hooks/usePreventAccess";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  const navigate = useNavigate();
  const isLoading = usePreventAccess();
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.landingPage}>
      {/* <h1>Mojdom</h1>*/}
      <img src="/logo-light.svg" />
      <h2>Vaša savršena nekretnina, na dohvat ruke.</h2>
      <div>
        <button onClick={() => navigate("/app")}>POGLEDAJ OGLASE</button>
        <button onClick={() => navigate("/register")}>REGISTRUJ SE</button>
      </div>
    </div>
  );
}
