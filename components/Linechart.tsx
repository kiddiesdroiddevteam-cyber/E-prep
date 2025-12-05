import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ dataPoints }) => {
    // Convert values to numbers
    const numeric = dataPoints.map(Number);

    // Data is newest → oldest, take first 4
    const recentNewestFirst = numeric.slice(0, 4);

    // Reverse so oldest → newest (newest ends up on RIGHT)
    const recent = recentNewestFirst.slice().reverse();

    // Generate correct labels:
    // If numeric.length = 15:
    // recent item 0 = Quiz 12
    // recent item 3 = Quiz 15
    const labels = recent.map((_, i) => {
        // Calculate which quiz this corresponds to
        const quizNumber = numeric.length - (recent.length - 1 - i);
        return `Quiz ${quizNumber}`;
    });

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: recent,
                backgroundColor: '#0055FF',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { ticks: { color: '#777' }, grid: { color: '#eee' } },
            y: { beginAtZero: true, ticks: { color: '#777' }, grid: { color: '#eee' } },
        },
    };

    return (
        <div className="w-[95vw] lg:w-full h-[350px] mx-auto flex items-center justify-center">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
