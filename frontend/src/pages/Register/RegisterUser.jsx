import LocationSelect from "../../ui/LocationSelect/LocationSelect";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Spinner from "../../ui/Spinner/Spinner";
import { useRegisterUser } from "../../hooks/useRegisterUser";
export default function RegisterUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useRegisterUser();

  if (isLoading) return <Spinner />;
  return (
    <form
      className={styles.registerForm}
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <div className={styles.headingWrapper}>
        <h2>Registracija</h2>
        <h3>Popunite lične podatke</h3>
      </div>
      <div>
        <label htmlFor="fullName">Ime i Prezime</label>
        <input
          type="text"
          placeholder="Novak Đoković"
          {...register("fullName", { required: "Upišite ime i prezime" })}
        />
        {errors.fullName?.message && <span>{errors.fullName.message} </span>}
      </div>
      <div>
        <label htmlFor="email">Email adresa</label>
        <input
          type="email"
          placeholder="novak@gmail.com"
          {...register("email", { required: "Upišite vaš email!" })}
        />
        {errors.email?.message && <span>{errors.email.message} </span>}
      </div>
      <div>
        <label htmlFor="location">Lokacija stanovanja</label>
        <LocationSelect register={register} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="*********"
          {...register("password", { required: "Unesite vašu lozinku" })}
        />
        {errors.password?.message && <span>{errors.password.message} </span>}
      </div>
      <div>
        <label htmlFor="phoneNumber">Broj telefona</label>
        <input
          type="number"
          placeholder="+3876123456"
          {...register("phoneNumber")}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Ponovite password</label>
        <input
          type="password"
          placeholder="********"
          {...register("passwordConfirm", { required: "Ponovite password!" })}
        />
        {errors.passwordConfirm?.message && (
          <span>{errors.passwordConfirm.message} </span>
        )}
      </div>
      <span>
        Već imate postojeći račun? <Link to="/login">Prijavi se</Link>
      </span>
      <button>REGISTRUJ SE</button>
    </form>
  );
}
