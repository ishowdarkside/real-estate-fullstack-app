import { useQueryClient } from "@tanstack/react-query";
import LocationSelect from "../../../ui/LocationSelect/LocationSelect";
import styles from "./FilterPanel.module.scss";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
export default function FilterPanel() {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFiltering(data) {
    //ovo ce da invalidatuje posts query a ona service funkcija ce da iz url-a cita search query

    //obrisi propertise sa search param
    if (data.vrstaOglasa === "remove") data.vrstaOglasa = "";
    if (data.location === "remove") data.location = "";
    if (data.tipNekretnine === "remove") data.tipNekretnine = "";
    //set podatke iz forme na search params koje ce fetch funkcija da cita
    setSearchParams(data);
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }

  return (
    <div className={styles.filterPanel}>
      Filtriraj nekretnine prema:
      <form
        className={styles.form}
        onSubmit={handleSubmit((data) => handleFiltering(data))}
      >
        <div>
          <label htmlFor="tipNekretnine">Tip nekretnine</label>
          <select {...register("tipNekretnine")}>
            <option value="remove">Sve</option>
            <option value="stan">Stan</option>
            <option value="kuca">Kuća</option>
          </select>
        </div>

        <div>
          <label htmlFor="price">Cijena</label>
          <div className={styles.priceWrapper}>
            <input type="number" placeholder="OD" {...register("pricegte")} />
            <input type="number" placeholder="DO" {...register("pricelte")} />
          </div>
        </div>

        <div>
          <label htmlFor="location">Lokacija</label>
          <LocationSelect
            register={register}
            bgColor="gray"
            includeAll={true}
          />
        </div>

        <div>
          <label htmlFor="vrstaOglasa">Vrsta oglasa</label>
          <select {...register("vrstaOglasa")}>
            <option value="remove">Sve</option>
            <option value="izdavanje">Izdavanje</option>
            <option value="prodaja">Prodaja</option>
          </select>
        </div>

        <button>Spasi izmjene</button>
      </form>
    </div>
  );
}
