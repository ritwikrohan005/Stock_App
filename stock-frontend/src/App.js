import React, { useState } from 'react';
import StockList from './components/StockList';
import PriceChart from './components/PriceChart'; 

const App = () => {
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [timeSeriesData, setTimeSeriesData] = useState([]); 


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#007bff' }}>Stock App</h1>
            <div style={{ marginBottom: '20px' }}>
                <StockList
                    onSelect={(asset, data) => {
                        setSelectedAsset(asset);
                        setTimeSeriesData((prevData) => {
                            console.log('inside set time series data: ', data);
                            return data;
                        });
                    }}
                />
            </div>
            {selectedAsset && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Selected Asset: {selectedAsset}</h2>
                    {Array.isArray(timeSeriesData) && timeSeriesData.length > 0 ? (
                        <PriceChart data={timeSeriesData} />
                    ) : (
                        <div>No time series data available for this asset.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
