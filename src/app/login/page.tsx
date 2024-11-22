"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Math from "../../../public/M_Dark.png";
import Link from "next/link";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/Authentication";
import useAuthentication from "@/contexts/Authentication";
const Login = () => {
  const [logged, setLogged] = useState(false);
  const { login } = useContext(useAuthentication);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const userSubmit = async (form: any) => {
    setLogged(true);
    try {
      await login(form.username, form.password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLogged(false);
    }
  };

  return (
    <main className="relative flex w-screen h-screen justify-center items-center">
      <div className="absolute">
        <form
          onSubmit={handleSubmit(userSubmit)}
          className="flex flex-col gap-3 p-10 rounded shadow"
        >
          <div className="flex justify-center py-5">
            <p>Logo Edivando Calcados</p>
          </div>
          <div className="flex flex-col">
            <label>Usuário</label>
            <input
              {...register("username")}
              type="text"
              className="px-3 py-2 text-sm rounded-lg border outline-none w-full "
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Senha</label>
            <input
              {...register("password")}
              type="password"
              className="px-3 py-2 text-sm rounded-lg border outline-none w-full "
              required
            />
          </div>
          <Button type="submit">Entrar</Button>
        </form>
        <Link
          href={"https://matheusmassena.com/"}
          className="flex w-full items-center gap-2 pt-2"
        >
          <Image src={Math} alt="Math developer" className="w-10 h-fit" /> 2024
          | Todos os direitos reservados
        </Link>
      </div>
    </main>
  );
};

export default Login;
