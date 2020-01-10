import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000'
});

//	Get
export const getMarcas = () => api.get(`brands`);
export const getVeiculos = (marca) => api.get(`/brands/${marca}/models`);
export const getModelos = (marca, model) => api.get(`/brands/${marca}/models/${model}/years`);
export const getVeiculo = (marca, modelo, ano) => api.get(`/brands/${marca}/models/${modelo}/years/${ano}/versions`);
export const getVersion = (marca, modelo, ano, versionId) => api.get(`/brands/${marca}/models/${modelo}/years/${ano}/versions/${versionId}`);


const apis = {
	getMarcas,
	getVeiculos,
	getModelos,
	getVeiculo,
	getVersion
}

export default apis;
