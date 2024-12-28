"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./login-page.module.css";

const schema = z.object({
  username: z.string().min(4, { message: "Username minimal 4 karakter" }),
  password: z.string().min(4, { message: "Password minimal 4 karakter" }),
});
export default function LoginPage() {
  const router = useRouter();

  type LoginSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      return router.push("/protected");
    }

    alert("Login failed");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.title}>Login</div>
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
