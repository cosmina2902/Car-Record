import axios from 'axios'


const AUTH_REST_API_BASE_URL = "http://localhost:8080/admin"

export const getUsersNumber = () => axios.get(AUTH_REST_API_BASE_URL + '/userNumber');

export const getMasiniInregistrate = () => axios.get(AUTH_REST_API_BASE_URL + '/masiniInregistrate');

export const getCheltuieliInregistrate = () => axios.get(AUTH_REST_API_BASE_URL + '/cheltuieliInregistrate');

export const getMarciInregistrate = () => axios.get(AUTH_REST_API_BASE_URL + '/marciInregistrate');

export const getTaxeByMarca = (marca) => axios.get(AUTH_REST_API_BASE_URL + '/taxe/suma/' + marca);


