import axios from "axios";
// import { API_URL } from 'react-native-dotenv';

//http://10.0.2.2  -- android
const api = axios.create({
  baseURL: "http://192.168.25.4:5001",
});

export default api;
