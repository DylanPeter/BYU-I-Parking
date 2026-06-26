import React, { createContext, useContext, useEffect, useState } from "react";

type UserRole = "Student" | "Faculty";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

type AuthState = {
  currentUser: User | null;
  token: string | null;
};

const AUTH_STORAGE_KEY = "byui-parking-auth";

const EmptyAuthState: AuthState = {
  currentUser: null,
  token: null,
};

function loadAuthState(): AuthState {
  if (typeof window === "undefined") return EmptyAuthState;
  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return EmptyAuthState;
    const parsed = JSON.parse(stored) as AuthState;
    if (!parsed || typeof parsed !== "object") return EmptyAuthState;
    return {
      currentUser: parsed.currentUser ?? null,
      token: typeof parsed.token === "string" ? parsed.token : null,
    };
  } catch {
    return EmptyAuthState;
  }
}

function isByuiEmail(email: string) {
  return /@byui\.edu$/i.test(email.trim());
}

const AuthContext = createContext<{
  currentUser: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}>({
  currentUser: null,
  token: null,
  login: async () => ({ success: false, error: "Auth provider missing." }),
  register: async () => ({ success: false, error: "Auth provider missing." }),
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(() => loadAuthState());

  useEffect(() => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const payload = await response.json();
      if (!response.ok) {
        return { success: false, error: payload.error ?? "Unable to sign in." };
      }
      setAuthState({
        currentUser: payload.user,
        token: payload.token,
      });
      return { success: true };
    } catch {
      return { success: false, error: "Unable to connect to auth server." };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, role }),
      });
      const payload = await response.json();
      if (!response.ok) {
        return { success: false, error: payload.error ?? "Unable to create account." };
      }
      setAuthState({
        currentUser: payload.user,
        token: payload.token,
      });
      return { success: true };
    } catch {
      return { success: false, error: "Unable to connect to auth server." };
    }
  };

  const logout = () => {
    setAuthState({ currentUser: null, token: null });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: authState.currentUser,
        token: authState.token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return auth;
}

export function isByuiAuthEmail(email: string) {
  return isByuiEmail(email);
}
