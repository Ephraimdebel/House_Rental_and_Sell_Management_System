import axios from "axios";
const instance = axios.create({
  baseURL: "http://10.5.90.124:5500/api/",
});
export default instance;
