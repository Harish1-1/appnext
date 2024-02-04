import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

function Developers() {
  const [reviewData, setReviewData] = useState({ good: 0, bad: 0 });

  useEffect(() => {
    fetch('http://localhost:4000/api/reviews/analysis')
      .then(response => response.json())
      .then(data => setReviewData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const data = {
    labels: ['Good Reviews', 'Bad Reviews'],
    datasets: [
      {
        data: [reviewData.good, reviewData.bad],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div>
      <h2>Review Analysis</h2>
      <Pie data={data} />
    </div>
  );
}

export default Developers;
