"use client";
import styles from "./card-product.module.css";
export default function CardProduct({
  id,
  thumbnail,
  title,
  price,
}: {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
}) {
  return (
    <div className={styles.wrapper_card} key={id}>
      <div className={styles.wrapper_img}>
        <img src={thumbnail} alt="" />
      </div>
      <div className={styles.wrapper_text}>
        <p className={styles.title_product}>{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}
