import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import OrderStatusDetailsDialog from './OrderStatusDetailsDialog';
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

export default function AdminDashboardCharts({ trends, orderStatus, orderStatusDetails = {} }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  // Pie chart click handler
  const onPieClick = (elems, event) => {
    if (!elems.length) return;
    const idx = elems[0].index;
    setSelectedStatus(idx);
    setDialogOpen(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Sales & Orders Trend</Typography>
              <Line
                data={{
                  labels: trends.labels,
                  datasets: [
                    {
                      label: 'Sales',
                      data: trends.sales,
                      borderColor: '#22c55e',
                      backgroundColor: 'rgba(34,197,94,0.1)',
                      tension: 0.3,
                      fill: true,
                    },
                    {
                      label: 'Orders',
                      data: trends.orders,
                      borderColor: '#38bdf8',
                      backgroundColor: 'rgba(56,189,248,0.1)',
                      tension: 0.3,
                      fill: true,
                    },
                  ],
                }}
                options={{ responsive: true, plugins: { legend: { display: true } } }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Order Status</Typography>
              <Pie
                data={{
                  labels: orderStatus.labels,
                  datasets: [
                    {
                      data: orderStatus.values,
                      backgroundColor: ['#22c55e', '#fbbf24', '#ef4444', '#38bdf8'],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true, position: 'bottom' } },
                  onClick: (event, elems) => onPieClick(elems, event),
                }}
              />
              <Typography variant="caption" color="text.secondary" mt={1} display="block">
                Click a segment to view details
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <OrderStatusDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={selectedStatus !== null ? `${orderStatus.labels[selectedStatus]} Orders` : ''}
        orders={selectedStatus !== null ? (orderStatusDetails[orderStatus.labels[selectedStatus]] || []) : []}
      />
    </>
  );
}
