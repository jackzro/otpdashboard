"use client";

import React, { useEffect, useState, createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/services/sent";
export const AuthContext = createContext({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isAuthenticated = () => {
    const { "nextauth.token": token } = parseCookies();
    return token;
  };

  async function signIn({ username, password }: any) {
    try {
      const response = await loginRequest({ username, password });
      const { token, payload } = response;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1,
        path: "/",
      });
      setCookie(undefined, "nextauth.user", JSON.stringify(payload), {
        maxAge: 60 * 60 * 1,
        path: "/",
      });
      setUser(payload);
      router.push("/");
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    destroyCookie(undefined, "nextauth.token", { path: "/" });
    destroyCookie(undefined, "nextauth.user", { path: "/" });
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    const { "nextauth.user": userData } = parseCookies();

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      // failed parse
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
