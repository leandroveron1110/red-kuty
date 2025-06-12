import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Tipos de datos del usuario
export interface AuthState {
  token: string | null;
  user: {
    id: number;
    name: string;
    role: 'CLIENT';
    depositTotal: number;
  } | null;
}

// Claves de almacenamiento
const tokenKey = "authToken";
const userKey = "authUser";

// Funciones para manejar localStorage
const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem(tokenKey, token);
};

const saveUserToLocalStorage = (user: AuthState["user"]) => {
  localStorage.setItem(userKey, JSON.stringify(user));
};

const removeAuthFromLocalStorage = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(tokenKey);
};

const getUserFromLocalStorage = (): AuthState["user"] | null => {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : null;
};

// Estado inicial
const initialState: AuthState = {
  token: getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
};

// Slice de autenticación
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        user: AuthState["user"];
      }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      saveTokenToLocalStorage(action.payload.token);
      saveUserToLocalStorage(action.payload.user);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      removeAuthFromLocalStorage();
    },
  },
});

// Exportaciones
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
