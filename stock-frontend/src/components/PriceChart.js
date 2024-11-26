import React from 'react';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const PriceChart = ({ data = [] }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <div>No data available to display the chart.</div>;
    }

    const chartData = {
        labels: data.map((item) => new Date(item.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Stock Price ($)',
                data: data.map((item) => item.close_usd),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                tension: 0.1,
            },
            {
                label: 'Cumulative Returns',
                data: data.map((item) => item.cumulative_return),
                borderColor: 'rgba(255,0,0,1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

    console.log('inside price chart: ', chartData)

    return (
        <div
            style={{
                marginTop: '20px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h2>Price Series Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default PriceChart;
