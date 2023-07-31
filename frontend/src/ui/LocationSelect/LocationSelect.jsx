/* eslint-disable react/prop-types */
const towns = [
  "bihać",
  "sarajevo",
  "mostar",
  "prijedor",
  "cazin",
  "trebinje",
  "tuzla",
  "banja luka",
  "zenica",
  "gradačac",
  "živinice",
  "gračanica",
  "zvornik",
  "doboj",
  "srebrenik",
  "livno",
  "konjic",
  "istočno sarajevo",
  "bijeljina",
  "gradiška",
  "visoko",
  "zavidovići",
  "bosanska krupa",
  "goražde",
  "lukavac",
  "laktaši",
  "novi grad",
  "široki brijeg",
  "čapljina",
  "derventa",
  "ravno",
  "orašje",
  "foča",
  "šipovo",
  "stolac",
  "travnik",
  "ljubuški",
  "brčko",
  "mrkonjić grad",
  "bileća",
  "prnjavor",
  "sanski most",
  "bugojno",
  "kiseljak",
  "kakanj",
  "velika kladuša",
  "prozor rama",
  "novi travnik",
  "odžak",
  "neum",
];
import styles from "./LocationSelect.module.scss";
export default function LocationSelect({
  register,
  setterFunc,
  location,
  bgColor,
  includeAll,
}) {
  if (register)
    return (
      <select
        style={bgColor && { backgroundColor: `var(--color-black-200)` }}
        className={styles.select}
        {...register("location", { required: "Unesite vašu lokaciju" })}
      >
        {includeAll && (
          <option value="remove" key="includeAll">
            Sve
          </option>
        )}
        {towns.map((town, i) => (
          <option value={town} key={i}>
            {town[0].toUpperCase() + town.slice(1)}
          </option>
        ))}
      </select>
    );

  if (setterFunc)
    return (
      <select
        style={bgColor && { backgroundColor: `var(--color-black-200)` }}
        className={styles.select}
        onChange={(e) => setterFunc(e.target.value)}
        value={location}
      >
        {towns.map((town, i) => (
          <option value={town} key={i}>
            {town[0].toUpperCase() + town.slice(1)}
          </option>
        ))}
      </select>
    );
}
