import LocationSelect from "../../ui/LocationSelect/LocationSelect";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../../ui/Spinner/Spinner";
import { useRegisterAgency } from "../../hooks/useRegisterAgency";

export default function RegisterAgency() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useRegisterAgency();

  if (isLoading) return <Spinner />;
  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit((data) => mutate(data))}
    >
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
          {...register("agencyName", { required: "Unesite ime agencije" })}
        />
        {errors.agencyName?.message && (
          <span>{errors.agencyName?.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="contactPerson">Kontakt osoba</label>
        <input
          type="text"
          placeholder="Novak Kontakter"
          name="contactPerson"
          id="contactPerson"
          {...register("contactPerson", {
            required: "Unesite ime kontakt osobe",
          })}
        />
        {errors.contactPerson?.message && (
          <span>{errors.contactPerson?.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email adresa agencije</label>
        <input
          type="email"
          placeholder="novak@gmail.com"
          name="email"
          id="email"
          {...register("email", { required: "Unesite email agencije" })}
        />
        {errors.email?.message && <span>{errors.email?.message}</span>}
      </div>
      <div>
        <label htmlFor="location">Lokacija agencije*</label>
        <LocationSelect register={register} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*********"
          name="password"
          id="password"
          {...register("password", { required: "Unesite password" })}
        />
        {errors.password?.message && <span>{errors.password?.message}</span>}
      </div>
      <div>
        <label htmlFor="phoneNumber">Broj telefona agencije</label>
        <input
          type="number"
          placeholder="+3876123456"
          name="phoneNumber"
          id="phoneNumber"
          {...register("phoneNumber")}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Ponovite password</label>
        <input
          type="password"
          placeholder="********"
          name="passwordConfirm"
          id="passwordConfirm"
          {...register("passwordConfirm", { required: "Ponovite password" })}
        />
        {errors.passwordConfirm?.message && (
          <span>{errors.passwordConfirm?.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="website">Website agencije</label>
        <input
          type="text"
          placeholder="www.noleagency.com"
          name="website"
          id="website"
          {...register("website")}
        />
      </div>
      <div className={styles.textareaWrapper}>
        <label htmlFor="about">O agenciji</label>
        <textarea name="about" id="about" {...register("about")}></textarea>
      </div>

      <span>
        Već imate postojeći račun? <Link to="/login">Prijavi se</Link>
      </span>
      <button>REGISTRUJ SE</button>
    </form>
  );
}
