import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // Flask backend URL

export const getAllStocks = () => axios.get(`${BASE_URL}/stocks`);
export const getStockDetails = (asset) => axios.get(`${BASE_URL}/stocks/${asset}`);
export const getStockReturns = (asset, startDate, endDate) =>
    axios.get(`${BASE_URL}/stocks/${asset}/returns`, {
        params: { start_date: startDate, end_date: endDate },
    });

