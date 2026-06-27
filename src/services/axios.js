import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL: "https://tkamgepjdnhwdqelesvk.supabase.co",
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrYW1nZXBqZG5od2RxZWxlc3ZrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTc1NzQwNSwiZXhwIjoyMDk3MzMzNDA1fQ.YeceDGJcGqczUSmaZHZUtiPdLWu5LCuh-uT7E8iL_po",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;