import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; // Flask backend URL

// Displays all the stock data
export const getAllStocks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/stocks`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching all stocks:', error);
        return []; //Returns empty array when there is an error
    }
};

// Display the data of a specific asset
export const getStockDetails = async (asset) => {
    try {
        const response = await axios.get(`${BASE_URL}/stocks/${asset.trim()}/returns`, {
            params: {
                'start_date': '12/1/1999',
                'end_date': '11/6/2023'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${asset}:`, error);
        return []; //Returns empty array when there is an error
    }
};
