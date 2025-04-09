import axios from "axios";

require("dotenv").config();

const BASE_DOMAIN = process.env.BASE_DOMAIN || "https://api.iopener-training.com";
const BASE_URL = `${BASE_DOMAIN}/api/v1`;

export const BaseDomain = BASE_DOMAIN;
const customFetch = axios.create({
    baseURL: BASE_URL,
});

export default customFetch;
