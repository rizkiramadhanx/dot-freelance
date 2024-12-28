"use client";

import axios from "axios";
import styles from "./detail-page.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type typeProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  tags: string[]
  images: string[];
}
export default function DetailPage({ id }: { id: string }) {
  const router = useRouter();

  const [dataProduct, setDataProduct] = useState<typeProduct | null>();

  const handleLogout = async () => {
    const res = await axios.request({
      method: "DELETE",
      url: "/api/auth",
    });

    if (res.status === 200) {
      router.push("/login");
    }
  };

  const fecthingDetailProduct = async () => {
    const res = await axios.request({
      method: "GET",
      url: process.env.NEXT_PUBLIC_BASE_URL + "/products/" + id,
    });

    setDataProduct(res.data);
  }

  useEffect(() => {
    fecthingDetailProduct();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper_header}>
        <h1 className={styles.title}>Detail Product Marketplace DOT</h1>
        <button className={styles.button_logout} onClick={handleLogout}>
          Logout
        </button>

      </div>
      {dataProduct ?
        <div className={styles.wrapper_grid}>
          <div className={styles.wrapper_img}>
            <Image src={dataProduct.thumbnail} alt="" width={500} height={500} />
          </div>
          <div className={styles.wrapper_text}>
            <h1 className={styles.title_product}>{dataProduct?.title}</h1>
            <div className={styles.wrapper_tag}>
              {dataProduct.tags.map((tag) => <div className={styles.tag} key={tag}>{tag}</div>)}
            </div>
            <div className={styles.price}> $ {dataProduct.price}</div>
            <p className={styles.description}>{dataProduct?.description}</p>
          </div>
        </div>
        : <div className={styles.wrapper_grid}>
          <div className={styles.skeleton_img} />
          <div className={styles.skeleton_text}>
            <div className={styles.skeleton_child} />
            <div className={styles.skeleton_child} />
            <div className={styles.skeleton_child} />
            <div className={styles.skeleton_child} />
          </div>
        </div>}
    </div>
  )
}