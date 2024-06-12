import axios from "axios";
import { saveAs } from "file-saver";


import { getToken } from "./AuthSerive";


const BASE_URL = 'http://localhost:8080/masini/taxe';

axios.interceptors.request.use(function (config) {
    
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
export const getCheltuieliMasina = (numarInmatriculare) => axios.get(BASE_URL + `/taxa/numarInmatriculare/${numarInmatriculare}`);

export const addCheltuiala = (cheltuiala, file) => {
  const formData = new FormData();
  formData.append("data", cheltuiala.data);
  formData.append("dataExpirare", cheltuiala.dataExpirare);
  formData.append("numarInmatriculare", cheltuiala.numarInmatriculare);
  formData.append("suma", cheltuiala.suma);
  formData.append("tip", cheltuiala.tip);
  formData.append("idCategorieCheltuieli", cheltuiala.idCategorieCheltuieli);

  if (file) {
    Array.from(file).forEach(file => {
      formData.append("file", file);
    });
  }

  return axios.post(BASE_URL, formData);
};

export const getTaxaById = (idCheltuiala) => axios.get(BASE_URL + `/taxa/${idCheltuiala}`);

export const getFileByCheltuialaId = (idCheltuiala) => axios.get(BASE_URL + `/file/${idCheltuiala}`);

export const updateCheltuiala = (idCheltuiala, cheltuiala, files, updateFiles) => {
  const formData = new FormData();
  formData.append("data", cheltuiala.data);
  formData.append("dataExpirare", cheltuiala.dataExpirare);
  formData.append("numarInmatriculare", cheltuiala.numarInmatriculare);
  formData.append("suma", cheltuiala.suma);
  formData.append("tip", cheltuiala.tip);
  formData.append("idCategorieCheltuieli", cheltuiala.idCategorieCheltuieli);
  formData.append("updateFiles", updateFiles);

  if (files) {
    Array.from(files).forEach(file => {
      formData.append("files", file);
    });
  }

  return axios.put(BASE_URL + `/taxa/${idCheltuiala}`, formData);
};



export const deleteCheltuiala = (idCheltuiala) => axios.delete(BASE_URL + `/taxa/${idCheltuiala}`);

export const getCheltuieliAnLuna = (numarInmatriculare, an, luna) => axios.get(BASE_URL + `/taxa/numarInmatriculare/${numarInmatriculare}/${an}/${luna}`);

export const getCheltuieliCategorie = (categorie, numarInmatriculare) => axios.get(BASE_URL + `/taxa/categorie/${categorie}/${numarInmatriculare}`);

export const getCheltuieliStartEndDate = (numarInmatriculare, startDate, endDate) => axios.get(BASE_URL + 
  `/taxa/numarInmatriculare/${numarInmatriculare}/perioada/${startDate}/endDate/${endDate}`);

//   export const downloadFisiere = (idCheltuiala) => {
//     return axios.get(`/downloadFiles/${idCheltuiala}`, { responseType: 'blob' })
// };

export const downloadFisiere = async (idTaxa) => {
  return axios.get(`http://localhost:8080/downloadFiles/${idTaxa}`, {
    responseType: 'blob',
    validateStatus: (status) => {
      return status >= 200 && status < 500; 
    }
  });
}