import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

export type User = {
  id: string;
  username: string;
  displayName: string;
  email: string;
  createdAt: Date;
  token: string;
  googleEmail: string | null;
};

export interface AuthContext {
  isAuthed: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  setGoogleEmail: (email: string | null) => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContext | null>(null);

const userKey = "receipts.user";
const isAuthedKey = "receipts.isAuthed";

function getStoreUser() {
  const val = localStorage.getItem(userKey);
  if (val == null) {
    return null;
  }
  return JSON.parse(val);
}

function setStoreUser(user: User | null) {
  if (user) {
    localStorage.setItem(userKey, JSON.stringify(user));
  } else {
    localStorage.removeItem(userKey);
  }
}

function getStoreIsAuthed() {
  return !!sessionStorage.getItem(isAuthedKey);
}

function setStoreIsAuthed(val: boolean) {
  if (val) {
    sessionStorage.setItem(isAuthedKey, "yes");
  } else {
    sessionStorage.removeItem(isAuthedKey);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoreUser());
  const [isAuthed, setIsAuthed] = useState<boolean>(getStoreIsAuthed());

  const login = useCallback(async (user: User) => {
    setStoreUser(user);
    setUser(user);
    setStoreIsAuthed(true);
    setIsAuthed(true);
  }, []);

  const logout = useCallback(async () => {
    setStoreUser(null);
    setUser(null);
    setStoreIsAuthed(false);
    setIsAuthed(false);
  }, []);

  const setGoogleEmail = useCallback(async (email: string | null) => {
    const newUser: User = {
      id: user!.id,
      username: user!.username,
      displayName: user!.displayName,
      email: user!.email,
      createdAt: user!.createdAt,
      token: user!.token,
      googleEmail: email,
    };
    setStoreUser(newUser);
    setUser(newUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthed, login, logout, setGoogleEmail, user }}
    >
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
