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

const PriceChart = ({ data }) => {
    const chartData = {
        labels: data.map((item) => item.date), // Dates on the x-axis
        datasets: [
            {
                label: 'Stock Price ($)',
                data: data.map((item) => item.close_usd), // Prices on the y-axis
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
                tension: 0.1,
            },
        ],
    };

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
