import React, { useState } from 'react';
import StockList from './components/StockList';
import PriceChart from './components/PriceChart';

const App = () => {
    const [selectedAsset, setSelectedAsset] = useState(null); // Tracks the selected asset
    const [timeSeriesData, setTimeSeriesData] = useState([]); // Tracks time series data for the chart

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#007bff' }}>Stock App</h1>
            <div style={{ marginBottom: '20px' }}>
                <StockList
                    onSelect={(asset, data) => {
                        setSelectedAsset(asset);
                        setTimeSeriesData(data);
                    }}
                />
            </div>
            {selectedAsset && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Selected Asset: {selectedAsset}</h2>
                    {timeSeriesData.length > 0 && <PriceChart data={timeSeriesData} />}
                </div>
            )}
        </div>
    );
};

export default App;
