import LocationSelect from "../../ui/LocationSelect/LocationSelect";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
export default function RegisterAgency() {
  return (
    <form className={styles.registerForm}>
      <div className={styles.headingWrapper}>
        <h2>Registracija agencije</h2>
        <h3>Popunite podatke</h3>
      </div>
      <div>
        <label htmlFor="agencyName">Ime agencije*</label>
        <input
          type="text"
          placeholder="Novak Agency"
          name="agencyName"
          id="agencyName"
        />
      </div>
      <div>
        <label htmlFor="contactPerson">Kontakt osoba</label>
        <input
          type="text"
          placeholder="Novak Kontakter"
          name="contactPerson"
          id="contactPerson"
        />
      </div>
      <div>
        <label htmlFor="email">Email adresa agencije</label>
        <input
          type="email"
          placeholder="novak@gmail.com"
          name="email"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="location">Lokacija agencije*</label>
        <LocationSelect />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*********"
          name="password"
          id="password"
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Broj telefona agencije</label>
        <input
          type="number"
          placeholder="+3876123456"
          name="phoneNumber"
          id="phoneNumber"
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Ponovite password</label>
        <input
          type="password"
          placeholder="********"
          name="passwordConfirm"
          id="passwordConfirm"
        />
      </div>
      <div>
        <label htmlFor="website">Website agencije</label>
        <input
          type="text"
          placeholder="www.noleagency.com"
          name="website"
          id="website"
        />
      </div>
      <div className={styles.textareaWrapper}>
        <label htmlFor="about">O agenciji</label>
        <textarea name="about" id="about"></textarea>
      </div>

      <span>
        Već imate postojeći račun? <Link to="/login">Prijavi se</Link>
      </span>
      <button>REGISTRUJ SE</button>
    </form>
  );
}
