"use client";

import { useEffect, useState } from "react";
import { api, destroyToken } from "../api";
import useDataAPI from "@/app/hooks/useDataAPI";
import { toast } from "sonner";

export function UserData() {
  const [currentUser, setCurrentUser] = useState<TUser>();
  const { data: users } = useDataAPI<TUser[]>(userURL);
  useEffect(() => {
    auth.user().then((response) => setCurrentUser(response.data));
  }, []);
  const currentUserCatch = users?.find(
    (item) => item.username === currentUser?.username
  );

  return currentUserCatch;
}

export const userURL = "api/users/";

class Token {
  DefaultUrl: string;

  constructor() {
    this.DefaultUrl = "auth/token";
  }
  async getToken(username: string, password: string) {
    const value = { username: username, password: password };
    toast(`${username} - ${password}`);
    try {
      const { data } = await api.post(`/auth/token/login/`, value);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

class Auth {
  DefaultUrl: string;
  token: Token;

  constructor() {
    this.DefaultUrl = "auth";
    this.token = new Token();
  }

  async login(username: string, password: string) {
    const response = await this.token.getToken(username, password);
    console.log(response);
    return response;
  }

  async logout() {
    try {
      const token = localStorage.getItem("authToken");
      await api.post(
        `${this.DefaultUrl}/token/logout/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } finally {
      destroyToken();
      localStorage.removeItem("authToken");
    }
  }

  async user() {
    const data = await api.get(`${this.DefaultUrl}/users/me/`);
    return data;
  }
}

const auth = new Auth();
export default auth;
