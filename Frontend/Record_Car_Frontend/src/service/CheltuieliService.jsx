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

export const getCheltuieliAnLuna = (numarInmatriculare, an, luna) => axios.get(BASE_URL + `/taxa/numarInmatriculare/${numarInmatriculare}/${an}/${luna}`);

export const getCheltuieliCategorie = (categorie, numarInmatriculare) => axios.get(BASE_URL + `/taxa/categorie/${categorie}/${numarInmatriculare}`);

export const getCheltuieliStartEndDate = (numarInmatriculare, startDate, endDate) => axios.get(BASE_URL + 
  `/taxa/numarInmatriculare/${numarInmatriculare}/perioada/${startDate}/endDate/${endDate}`);