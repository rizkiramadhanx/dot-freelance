"use client";
import { useRouter } from "next/navigation";
import styles from "./card-product.module.css";
import Image from "next/image";
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
  const router = useRouter()
  return (
    <div className={styles.wrapper_card} onClick={() => router.push(`/protected/${id}`)} key={id}>
      <div className={styles.wrapper_img}>
        <Image src={thumbnail} alt="thumbnail" width={200} height={200} />
      </div>
      <div className={styles.wrapper_text}>
        <p className={styles.title_product}>{title}</p>
        <p>$ {price}</p>
      </div>
    </div>
  );
}
