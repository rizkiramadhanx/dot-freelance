"use client";

import axios from "axios";
import styles from "./protected-page.module.css";
import { useEffect, useState } from "react";
import CardProduct from "./card-product";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const [dataProducts, setDataProducts] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    const res = await axios.request({
      method: "DELETE",
      url: "api/auth",
    });

    if (res.status === 200) {
      router.push("/login");
    }
  };

  const fetchingDataListProductWithSearch = async () => {
    const res = await axios.request({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BASE_URL + "/products/search?q=" + search,
    });

    setDataProducts(res.data.products);
  };
  const fetchingDataListProduct = async () => {
    const res = await axios.request({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BASE_URL + "/products",
    });

    setDataProducts(res.data.products);
  };

  useEffect(() => {
    if (search !== "") {
      fetchingDataListProductWithSearch();
    } else {
      fetchingDataListProduct();
    }
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper_header}>
        <h1 className={styles.title}>Product Marketplace DOT</h1>
        <button className={styles.button_logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className={styles.wrapper_search}>
        <input
          className={styles.input_search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Cari Produk"
        />
      </div>
      <div className={styles.wrapper_grid}>
        {dataProducts.length > 0 ? (
          dataProducts.map(
            (item: {
              id: number;
              thumbnail: string;
              title: string;
              price: number;
            }) => (
              <CardProduct
                key={item.id}
                id={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                price={item.price}
              />
            )
          )
        ) : (
          <div>Data yang dicari Kosong</div>
        )}
      </div>
    </div>
  );
}
