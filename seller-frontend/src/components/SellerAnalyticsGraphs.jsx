import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function SellerAnalyticsGraphs({ salesData, inventoryData }) {
  // salesData: { labels: [], values: [] }
  // inventoryData: { labels: [], values: [] }
  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>Sales Over Time</Typography>
          <Line
            data={{
              labels: salesData.labels,
              datasets: [
                {
                  label: 'Sales',
                  data: salesData.values,
                  borderColor: '#22c55e',
                  backgroundColor: 'rgba(34,197,94,0.2)',
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" mb={2}>Inventory Breakdown</Typography>
          <Bar
            data={{
              labels: inventoryData.labels,
              datasets: [
                {
                  label: 'Stock',
                  data: inventoryData.values,
                  backgroundColor: '#38bdf8',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
