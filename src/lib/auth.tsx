import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: string;
  displayName: string;
  token: string;
};

export interface AuthContext {
  isAuthed: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = "receipts.user";

function getStoreUser() {
  const val = localStorage.getItem(key);
  if (val == null) {
    return null;
  }
  return JSON.parse(val);
}

function setStoreUser(user: User | null) {
  if (user) {
    localStorage.setItem(key, JSON.stringify(user));
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthed = !!user;

  const login = useCallback(async (user: User) => {
    setStoreUser(user);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    setStoreUser(null);
    setUser(null);
  }, []);

  useEffect(() => {
    setUser(getStoreUser());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthed, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use in context");
  }
  return context;
}
