import axios from "axios";

import { getToken } from "./AuthSerive";


const BASE_URL = 'http://localhost:8080/masini/taxe';

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
export const getCheltuieliMasina = (numarInmatriculare) => axios.get(BASE_URL + `/taxa/numarInmatriculare/${numarInmatriculare}`);

export const addCheltuiala = (cheltuiala) => axios.post(BASE_URL, cheltuiala);