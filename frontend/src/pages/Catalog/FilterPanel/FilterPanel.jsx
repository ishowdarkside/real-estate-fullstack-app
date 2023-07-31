import LocationSelect from "../../../ui/LocationSelect/LocationSelect";
import styles from "./FilterPanel.module.scss";
import { useForm } from "react-hook-form";
export default function FilterPanel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className={styles.filterPanel}>
      Filtriraj nekretnine prema:
      <form className={styles.form}>
        <div>
          <label htmlFor="tipNekretnine">Tip nekretnine</label>
          <select>
            <option value="stan">Stan</option>
            <option value="kuca">Kuća</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Cijena</label>
          <div className={styles.priceWrapper}>
            <input type="number" placeholder="OD" />
            <input type="number" placeholder="DO" />
          </div>
        </div>

        <div>
          <label htmlFor="location">Lokacija</label>
          <LocationSelect register={register} bgColor="gray" />
        </div>

        <div>
          <label htmlFor="vrstaOglasa">Vrsta oglasa</label>
          <select>
            <option value="izdavanje">Izdavanje</option>
            <option value="prodaja">Prodaja</option>
          </select>
        </div>

        <button>Spasi izmjene</button>
      </form>
    </div>
  );
}
