import { useState } from "react";
import styles from "./Register.module.scss";
import RegisterUser from "./RegisterUser";
import RegisterAgency from "./RegisterAgency";
import ReturnButton from "../../ui/ReturnButton/ReturnButton";
import { useNavigate } from "react-router-dom";
import { usePreventAccess } from "../../hooks/usePreventAccess";
import Spinner from "../../ui/Spinner/Spinner";
export default function Register() {
  const isLoading = usePreventAccess();
  const [activePanel, setActivePanel] = useState(null);
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.interfaceWrapper}>
      <ReturnButton
        cb={activePanel ? () => setActivePanel(null) : () => navigate("/")}
      />
      {!activePanel && (
        <div className={styles.pickModal}>
          <span>Registruj se kao</span>
          <div onClick={() => setActivePanel("agency")}>
            <span>AGENCIJA</span>
            <img src="/agency.svg" alt="agency briefcase" />
          </div>
          <div onClick={() => setActivePanel("user")}>
            <span>KORISNIK</span>
            <img src="/user.svg" alt="agency briefcase" />
          </div>
        </div>
      )}

      {activePanel === "user" && <RegisterUser />}
      {activePanel === "agency" && <RegisterAgency />}
    </div>
  );
}
