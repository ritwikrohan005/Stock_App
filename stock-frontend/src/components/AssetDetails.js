import React, { useState, useEffect } from 'react';
import { getStockDetails, getStockReturns } from '../services/api';

const AssetDetails = ({ asset }) => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [cumulativeReturn, setCumulativeReturn] = useState(null);

    useEffect(() => {
        if (asset) {
            getStockDetails(asset)
                .then((response) => setStocks(response.data))
                .catch((error) => console.error('Error fetching asset stocks:', error));
        }
    }, [asset]);

    const calculateReturn = () => {
        if (!selectedStock || !startDate || !endDate) {
            alert('Please select a stock and date range');
            return;
        }

        getStockReturns(selectedStock, startDate, endDate)
            .then((response) => {
                const returnData = response.find((item) => item.cumulative_return !== undefined);
                setCumulativeReturn(returnData ? returnData.cumulative_return : 'No data available');
            })
            .catch((error) => console.error('Error calculating returns:', error));
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Stocks for {asset}</h2>
            <div>
                <h3>Select a Stock:</h3>
                <ul>
                    {stocks.map((stock, index) => (
                        <li
                            key={index}
                            style={{
                                cursor: 'pointer',
                                color: stock.asset === selectedStock ? 'blue' : 'black',
                                fontWeight: stock.asset === selectedStock ? 'bold' : 'normal',
                            }}
                            onClick={() => setSelectedStock(stock.asset)}
                        >
                            {stock.asset} - ${stock.close_usd} (Date: {stock.date})
                        </li>
                    ))}
                </ul>
            </div>
            {selectedStock && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Selected Stock: {selectedStock}</h3>
                    <div>
                        <label>Start Date: </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>End Date: </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={calculateReturn}
                        style={{
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Calculate Cumulative Return
                    </button>
                </div>
            )}
            {cumulativeReturn !== null && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Cumulative Return: {cumulativeReturn}</h3>
                </div>
            )}
        </div>
    );
};

export default AssetDetails;
