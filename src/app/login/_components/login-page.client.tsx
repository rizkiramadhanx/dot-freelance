"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./login-page.module.css";
import axios from "axios";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(4, { message: "Username minimal 4 karakter" }),
  password: z.string().min(4, { message: "Password minimal 4 karakter" }),
});
export default function LoginPage() {
  const router = useRouter();

  type LoginSchema = z.infer<typeof schema>;

  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {

    try {
      const res = await axios.request({
        method: "POST",
        url: "api/auth",
        data,
      });
  
      if (res.status === 200) {
        return router.push("/protected");
      }
    } catch (error) {
      if(error instanceof Error) console.log(error.message);
      setIsError(true);
    }


    alert("Login failed");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Login</div>
        <div className={styles.credentials}>u: emilys, p: emilyspass</div>

        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input className={styles.input} {...register("username")} />
          <small className={styles.error_text}>
            {" "}
            {errors.username?.message ? `*) ${errors.username?.message}` : ""}
          </small>
        </div>
        <div className={styles.input_wrapper}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={styles.input}
            {...register("password")}
          />
          <small className={styles.error_text}>
            {errors.password?.message ? `*) ${errors.password?.message}` : ""}
          </small>
        </div>
        {isError && (
          <small className={styles.error_text}>Login failed</small>
        )}
        <button
          type="submit"
          className={
            !isValid ? styles.button_submit_disabled : styles.button_submit
          }
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
