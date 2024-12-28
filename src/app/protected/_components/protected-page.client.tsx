"use client";

import axios from "axios";
import styles from "./protected-page.module.css";
import { useEffect, useState } from "react";
import Skeleton from "./skeleton";

type typeCity = {
  city_id: string;
  province: string;
};

export default function ProtectedPage() {
  const [provinceList, setCityList] = useState<typeCity[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string | number | null>(
    ""
  );
  const [selectedCityTargetId, setSelectedCityTargetId] = useState<
    string | null
  >("");

  const [data, setData] = useState(null);
  const [weight, setWeight] = useState<number>(0);

  const fetchingCity = async () => {
    const res = await axios.get("https://api.rajaongkir.com/starter/city", {
      params: {
        key: process.env.RAJA_ONGKIR_KEY_API,
      },
    });
    setCityList(res.data.rajaongkir.results);
  };

  useEffect(() => {
    fetchingCity();
  }, []);

  useEffect(() => {
    if (selectedCityId) {
      fetchingCity();
    }
  }, [selectedCityId]);

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityId(e.target.value);
  };

  const handleChangeCityTarget = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCityTargetId(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.request({
      method: "POST",
      url: "https://api.rajaongkir.com/starter/cost",

      headers: {
        key: process.env.RAJA_ONGKIR_KEY_API,
      },
      data: {
        origin: selectedCityId,
        destination: selectedCityTargetId,
        weight: weight,
        courier: "jne",
      },
    });

    setData(res.data.results[0].costs);
  };

  return (
    <div className={styles.container}>
      <h1>Checking cost shipping with RajaOngkir</h1>
      <div style={{ marginTop: "1rem" }}>
        {JSON.stringify({ selectedCityId, selectedCityTargetId, weight })}
      </div>
      <div className={styles.wrapper_form}>
        <label htmlFor="provinsi" className={styles.label_form}>
          Kota Awal
        </label>
        {provinceList.length > 0 ? (
          <select
            className={styles.select_form}
            onChange={(e) => handleChangeCity(e)}
          >
            {provinceList.map((city, key) => (
              <option key={key} value={city.city_id}>
                {city.province}
              </option>
            ))}
          </select>
        ) : (
          <Skeleton />
        )}

        <br />
        <label htmlFor="provinsi" className={styles.label_form}>
          Kota Tujuan
        </label>
        {provinceList.length > 0 ? (
          <select
            className={styles.select_form}
            onChange={(e) => handleChangeCityTarget(e)}
          >
            {provinceList.map((province, key) => (
              <option key={key} value={province.city_id}>
                {province.province}
              </option>
            ))}
          </select>
        ) : (
          <Skeleton />
        )}

        <br />
        <div className={styles.form_weight}>
          <label className={styles.label_form}>Berat (gram)</label>
          <input
            type="number"
            onChange={(e) => setWeight(Number(e.target.value))}
            className={styles.input_form}
          />
        </div>

        <button onClick={handleSubmit} className={styles.button_form}>
          Cek Ongkir
        </button>

        {data ? (
          <div>
            {/* {JSON.stringify(data)} */}
            {data.map(
              (
                item: { description: string; cost: { value: string }[] },
                key: number
              ) => (
                <div key={key}>
                  <p>{item.description}</p>
                  {item.cost.map((cost: { value: string }, key: number) => (
                    <div key={key}>
                      <p>{cost.value}</p>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
