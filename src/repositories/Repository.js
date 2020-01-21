import axios from "axios";

const VUE_APP_API = "https://192.168.1.5:45455";

//const defaultConfig = process.env.VUE_APP_API;
const baseDomain = VUE_APP_API;

const baseURL = `${baseDomain}`;

export default axios.create({
    baseURL
});