import React, { useState, useEffect } from 'react';
import { getAllStocks, getStockDetails } from '../services/api';

const StockList = ({ onSelect }) => {
    const [assets, setAssets] = useState([]); // List of unique assets

    useEffect(() => {
        // Fetch all stocks and extract unique asset names
        getAllStocks()
            .then((response) => {
                const uniqueAssets = [...new Set(response.data.map((item) => item.asset))];
                setAssets(uniqueAssets);
            })
            .catch((error) => console.error('Error fetching stocks:', error));
    }, []);

    const handleAssetClick = (asset) => {
        getStockDetails(asset)
            .then((response) => {
                onSelect(asset, response.data); // Pass asset and its time series data to App.js
            })
            .catch((error) => console.error(`Error fetching details for ${asset}:`, error));
    };

    return (
        <div>
            <h2>Stock List</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {assets.map((asset, index) => (
                    <button
                        key={index}
                        onClick={() => handleAssetClick(asset)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {asset}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StockList;
