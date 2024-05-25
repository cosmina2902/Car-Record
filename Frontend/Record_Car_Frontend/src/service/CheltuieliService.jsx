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

export const getTaxaById = (idCheltuiala) => axios.get(BASE_URL + `/taxa/${idCheltuiala}`);

export const updateCheltuiala = (idCheltuiala, cheltuiala) => axios.put(BASE_URL + `/taxa/${idCheltuiala}`, cheltuiala);

export const deleteCheltuiala = (idCheltuiala) => axios.delete(BASE_URL + `/taxa/${idCheltuiala}`);