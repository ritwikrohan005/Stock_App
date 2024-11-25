import React, { useState, useEffect } from 'react';
import { getAllStocks, getStockDetails } from '../services/api';

const StockList = ({ onSelect }) => {
    const [assets, setAssets] = useState([]); 

    useEffect(() => {
        getAllStocks()
            .then((stocks) => {
                const uniqueAssets = [...new Set(stocks.map((item) => item.asset))];
                setAssets(uniqueAssets);
            })
            .catch((error) => console.error('Error fetching stocks:', error));
    }, []);

    const handleAssetClick = (asset) => {
        getStockDetails(asset)
            .then((data) => {
                console.log('Fetched data for asset:', asset, data); 
                onSelect(asset, data);
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
