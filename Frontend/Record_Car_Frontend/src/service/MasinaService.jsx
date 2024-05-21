import axios from "axios";

import { getToken } from "./AuthSerive";


const BASE_URL = 'http://localhost:8080/masini';

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  


  export const adaugareMasina = (formData) => {
    const data = new FormData();

    
    data.append('masina', JSON.stringify({
        idUser: formData.idUser, 
        marca: formData.marca,
        model: formData.model,
        an: formData.an,
        capacitate: formData.capacitate,
        combustibil: formData.combustibil,
        numarInmatriculare: formData.numarInmatriculare
    }));

    
    if (formData.imagine) {
        data.append('image', formData.imagine);
    }

    return axios.post(BASE_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken() 
        }
    });
    
};

export const getIdUserLogat = () => axios.get(BASE_URL + '/userLogat');

export const getAllMasini = () => axios.get(BASE_URL);

export const getImagineMasina = (fileName) => {
    if (typeof fileName !== 'string') {
        console.error('FileName must be a string', fileName);
        return;
    }
    return axios.get(`${BASE_URL}/${fileName}`, { responseType: 'blob' });
};

export const getMasinaById = (idMasina) => axios.get(BASE_URL +`/masina/${idMasina}`);

export const deleteMasina = (idMasina) =>  axios.delete(BASE_URL +`/masina/${idMasina}`);

export const updateMasina = (idMasina, formData) => {
    const data = new FormData();
    data.append('masina', JSON.stringify({
        idUser: formData.idUser, 
        marca: formData.marca,
        model: formData.model,
        an: formData.an,
        capacitate: formData.capacitate,
        combustibil: formData.combustibil,
        numarInmatriculare: formData.numarInmatriculare
    }));

    if (formData.imagine) {
        data.append('image', formData.imagine);
    }

    return axios.put(`${BASE_URL}/masina/${idMasina}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': getToken()
        }
    });
};
