/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./CreatePost.module.scss";
import { useForm } from "react-hook-form";
import LocationSelect from "../../ui/LocationSelect/LocationSelect";
import { toast } from "react-hot-toast";
import { useCreatePost } from "../../hooks/useCreatePost";
import Spinner from "../../ui/Spinner/Spinner";

export default function CreatePost() {
  const [type, setType] = useState(null);

  return (
    <div className={styles.body}>
      <div className={`container ${styles.CreatePostContainer}`}>
        {!type && <ChooseType onSetType={setType} />}
        {type && <Form type={type} />}
      </div>
    </div>
  );
}

function ChooseType({ onSetType }) {
  return (
    <div className={styles.typeWrapper}>
      <span>Izaberite vrstu nekretnine</span>

      <div>
        <div onClick={() => onSetType("stan")} className={styles.option}>
          <img src="/stan.svg" alt="stan" />
          STAN
        </div>
        <div onClick={() => onSetType("kuća")} className={styles.option}>
          <img src="/kuca.svg" alt="kuca" />
          KUĆA
        </div>
      </div>
    </div>
  );
}

function Form({ type }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const [novogradnja, setNovogradnja] = useState(null);
  const [namjesten, setNamjesten] = useState(null);
  const [garage, setGarage] = useState(null);
  const [indexed, setIndexed] = useState(null);

  const { mutate, isLoading } = useCreatePost();

  async function handlePost(data) {
    data.tipNekretnine = type;
    if (
      novogradnja === null ||
      namjesten === null ||
      garage === null ||
      indexed === null
    )
      return toast.error("Popunite sva polja!");
    data.novogradnja = novogradnja;
    data.namjesten = namjesten;
    data.garage = garage;
    data.indexed = indexed;

    const formData = new FormData();
    const filesArray = Array.from(data.photos);
    data.photos = undefined;
    Object.entries(data).forEach((e) => formData.append(e[0], e[1]));
    filesArray.forEach((file) => formData.append("photos", file));

    mutate(formData);
  }

  if (isLoading) return <Spinner />;
  return (
    <form
      className={styles.postForm}
      onSubmit={handleSubmit((data) => handlePost(data))}
      encType="multipart/form-data"
    >
      <div className={styles.title}>
        <label htmlFor="title">NASLOV</label>
        <input
          type="text"
          placeholder={
            type === "stan" ? "Stan na varaždinu" : "Kuća na varaždinu"
          }
          {...register("title", { required: "Unesite naslov vaše objave" })}
          name="title"
        />
        {errors.title?.message && (
          <span className={styles.errorMsg}> {errors.title.message}</span>
        )}
      </div>
      <div className={styles.subtitle}>
        <label htmlFor="subtitle">PODNASLOV</label>
        <input
          type="text"
          placeholder={
            type === "stan"
              ? "Stan 300 metara od mora"
              : "Kuća 300 metara od mora"
          }
          {...register("subtitle", {
            required: "Unesite podnaslov vaše objave",
          })}
          name="subtitle"
        />
        {errors.subtitle?.message && (
          <span className={styles.errorMsg}>{errors.subtitle.message}</span>
        )}
      </div>
      <div className={styles.description}>
        <label htmlFor="description">
          {type === "stan" ? "Opišite vaš stan" : "Opišite vašu kuću"}
        </label>
        <textarea
          {...register("description", {
            required: "Unesite opis vaše objave",
          })}
        />
        {errors.description?.message && (
          <span className={styles.errorMsg}>{errors.description.message}</span>
        )}
      </div>
      <div className={styles.photos}>
        <label htmlFor="photos">ODABERITE FOTOGRAFIJE</label>
        <input
          type="file"
          multiple
          id="photos"
          name="photos"
          {...register("photos", { required: "unesite fotografije" })}
        />

        {errors.photos?.message && (
          <span className={styles.errorMsg}>{errors.photos.message}</span>
        )}
      </div>
      <div className={styles.location}>
        <label htmlFor="location">LOKACIJA</label>
        <LocationSelect register={register} />
      </div>
      <div className={styles.novogradnja}>
        <span>NOVOGRADNJA</span>
        <div>
          <button
            type="button"
            className={novogradnja ? "blackBtn" : ""}
            onClick={() => setNovogradnja(true)}
          >
            DA
          </button>
          <button
            type="button"
            className={novogradnja === false ? "blackBtn" : ""}
            onClick={() => setNovogradnja(false)}
          >
            NE
          </button>
        </div>
      </div>
      <div className={styles.namjesteno}>
        <span>NAMJEŠTENO</span>
        <div>
          <button
            type="button"
            className={namjesten ? "blackBtn" : ""}
            onClick={() => setNamjesten(true)}
          >
            DA
          </button>
          <button
            type="button"
            className={namjesten === false ? "blackBtn" : ""}
            onClick={() => setNamjesten(false)}
          >
            NE
          </button>
        </div>
      </div>
      <div className={styles.grijanje}>
        <label htmlFor="grijanje">GRIJANJE</label>
        <select
          id="grijanje"
          {...register("grijanje", { required: "Navedite tip grijanja" })}
        >
          <option value="plin">Plin</option>
          <option value="centralno">Centralno</option>
          <option value="bez grijanja">Bez grijanja</option>
        </select>
        {errors.grijanje?.message && (
          <span className={styles.errorMsg}>{errors.grijanje.message}</span>
        )}
      </div>
      <div className={styles.sobe}>
        <label htmlFor="roomNum">BROJ SOBA</label>
        <input
          type="number"
          name="roomNum"
          {...register("roomNum", {
            required: `Navedite broj soba ${
              type == "stan" ? "vašeg stana" : "vaše kuće"
            }`,
          })}
        />
        {errors.roomNum?.message && (
          <span className={styles.errorMsg}>{errors.roomNum.message}</span>
        )}
      </div>

      <div className={styles.vrstaOglasa}>
        <label htmlFor="vrstaOglasa">Vrsta oglasa</label>
        <select
          {...register("vrstaOglasa", { required: "Navedite vrstu oglasa" })}
        >
          <option value="prodaja">Prodaja</option>
          <option value="izdavanje">Izadavanje</option>
        </select>
        {errors.vrstaOglasa?.message && (
          <span className={styles.errorMsg}>{errors.vrstaOglasa.message}</span>
        )}
      </div>
      <div className={styles.sprat}>
        <label htmlFor="sprat">{type == "stan" ? "SPRAT" : "SPRATOVA"}</label>
        <input
          type="number"
          {...register("sprat", {
            required: `${
              type === "stan"
                ? "Navedite na kojem je spratu stan"
                : "Navedite koliko spratova ima kuća"
            }`,
          })}
        />
        {errors.sprat?.message && (
          <span className={styles.errorMsg}>{errors.sprat.message}</span>
        )}
      </div>
      <div className={styles.garage}>
        <span>Garaža</span>
        <div>
          <button
            type="button"
            className={garage ? "blackBtn" : ""}
            onClick={() => setGarage(true)}
          >
            DA
          </button>
          <button
            type="button"
            className={garage === false ? "blackBtn" : ""}
            onClick={() => setGarage(false)}
          >
            NE
          </button>
        </div>
      </div>
      <div className={styles.indexed}>
        <span>UKNJIŽENO</span>
        <div>
          <button
            type="button"
            className={indexed ? "blackBtn" : ""}
            onClick={() => setIndexed(true)}
          >
            DA
          </button>
          <button
            type="button"
            className={indexed === false ? "blackBtn" : ""}
            onClick={() => setIndexed(false)}
          >
            NE
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="kvadrata">KVADRATA</label>
        <input
          type="number"
          {...register("kvadrata", {
            required: `Unesite koliko kvadrata ima ${
              type === "stan" ? "vaš stan" : "vaša kuća"
            }`,
          })}
          name="kvadrata"
        />
        {errors.kvadrata?.message && (
          <span className={styles.errorMsg}>{errors.kvadrata.message}</span>
        )}
      </div>
      <button className={styles.postBtn}>OBJAVI OGLAS</button>
    </form>
  );
}
