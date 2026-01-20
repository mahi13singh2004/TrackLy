import { create } from "zustand"
import axiosInstance from "../utils/axios.js"

axiosInstance.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user: null,
    loading: true,
    err: null,

    signup: async (data) => {
        try {
            set({ loading: true, err: null });
            const res = await axiosInstance.post("/api/auth/signup", data)
            set({ user: res.data.user })
            return true
        }
        catch (error) {
            set({ err: error.response?.data?.message || "Signup failed" });
            throw error;
        }
        finally {
            set({ loading: false });
        }
    },

    login: async (data) => {
        try {
            set({ loading: true, err: null });
            const res = await axiosInstance.post("/api/auth/login", data);
            set({ user: res.data.user });
            return true
        }
        catch (error) {
            set({ err: error.response?.data?.message || "Login failed" });
            throw error;
        }
        finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true, err: null });
            await axiosInstance.post("/api/auth/logout");
            set({ user: null });
        }
        catch (error) {
            set({ err: "Logout failed" });
        }
        finally {
            set({ loading: false });
        }
    },

    checkAuth: async () => {
        try {
            set({ loading: true, err: null });
            const res = await axiosInstance.get("/api/auth/checkAuth");
            set({ user: res.data.user });
        }
        catch (error) {
            set({ user: null });
        }
        finally {
            set({ loading: false });
        }
    },

    getMe:async()=>{
        try {
            const res = await axiosInstance.get("/api/auth/getMe");
            set({ user: res.data.user });
        } catch (error) {
            console.log(error);
        }
    },

    clearError: () => set({ err: null }),
}))