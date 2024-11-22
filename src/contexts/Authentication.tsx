"use client";

import auth from "@/app/services/actions/Auth";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState, useContext } from "react";
import { toast } from "sonner";

const AuthenticationContext = createContext<AuthType>({} as AuthType);
type AuthType = {
  user: null;
  logged: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};
export const AuthenticationProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    setLogged(!!user);
  }, [user]);

  const logout = () => {
    auth.logout();
    router.push("/auth");
  };

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      throw new Error("Username and password must be provided");
    }
    try {
      console.log("logging...");
      const token = await auth.login(username, password);
      console.log(token);
      setCookie("token", token.auth_token);
      toast.success("Logado com sucesso!");
      router.push("/editor");
    } catch (error) {
      toast.error("Erro ao realizar o login", {
        description: "Revise o usuário e senha e tente novamente",
      });
    }
  };

  return (
    <AuthenticationContext.Provider value={{ user, logged, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuth(): AuthType {
  const context = useContext(AuthenticationContext);
  return context;
}

export default AuthenticationContext;
