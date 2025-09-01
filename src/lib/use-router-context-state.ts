import type { RouterContext, UserRole } from "@/routes/__root";
import { useState, useEffect } from "react";

export function useRouterContextState(): RouterContext {
  const [role, setRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem("userRole") as UserRole;
    return savedRole || null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem("userRole", role);
    } else {
      localStorage.removeItem("userRole");
    }
  }, [role]);

  const login = (newRole: "admin" | "client") => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const isAdmin = role === "admin";
  const isClient = role === "client";
  const isAuthenticated = !!role;

  return {
    role,
    login,
    logout,
    isAdmin,
    isClient,
    isAuthenticated,
  };
}
