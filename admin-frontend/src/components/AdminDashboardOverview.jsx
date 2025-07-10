import React from 'react';
import { Box, Typography, Skeleton, Alert } from '@mui/material';
import AdminDashboardMetrics from './AdminDashboardMetrics';
import AdminRecentActivityTable from './AdminRecentActivityTable';
import AdminSummaryCards from './AdminSummaryCards';
import AdminDashboardCharts from './AdminDashboardCharts';
import useApiResource from './useApiResource';

export default function AdminDashboardOverview() {
  // Fetch each dashboard resource independently
  const {
    data: summaryData,
    error: summaryError,
    loading: summaryLoading
  } = useApiResource('/api/admin/dashboard/summary');

  const {
    data: trendsData,
    error: trendsError,
    loading: trendsLoading
  } = useApiResource('/api/admin/dashboard/trends');

  const {
    data: orderStatusData,
    error: orderStatusError,
    loading: orderStatusLoading
  } = useApiResource('/api/admin/dashboard/order-status');

  const {
    data: metricsData,
    error: metricsError,
    loading: metricsLoading
  } = useApiResource('/api/admin/dashboard/metrics');

  const {
    data: activitiesData,
    error: activitiesError,
    loading: activitiesLoading
  } = useApiResource('/api/admin/dashboard/activities');

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" mb={3}>
        Overview of platform activity, users, sellers, and products.
      </Typography>

      {/* Summary Cards */}
      {summaryLoading ? (
        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
      ) : summaryError ? (
        <Alert severity="error">{summaryError}</Alert>
      ) : (
        <AdminSummaryCards summary={summaryData?.summary} details={summaryData?.details} />
      )}

      {/* Dashboard Charts */}
      {trendsLoading || orderStatusLoading ? (
        <Skeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
      ) : trendsError || orderStatusError ? (
        <Alert severity="error">{trendsError || orderStatusError}</Alert>
      ) : (
        <AdminDashboardCharts
          trends={trendsData || { labels: [], sales: [], orders: [] }}
          orderStatus={orderStatusData ? { labels: orderStatusData.labels, values: orderStatusData.values } : { labels: [], values: [] }}
          orderStatusDetails={orderStatusData?.details || {}}
        />
      )}

      {/* Metrics */}
      {metricsLoading ? (
        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
      ) : metricsError ? (
        <Alert severity="error">{metricsError}</Alert>
      ) : (
        <AdminDashboardMetrics metrics={metricsData} />
      )}

      {/* Recent Activities */}
      {activitiesLoading ? (
        <Skeleton variant="rectangular" height={120} sx={{ mb: 2 }} />
      ) : activitiesError ? (
        <Alert severity="error">{activitiesError}</Alert>
      ) : (
        <AdminRecentActivityTable activities={activitiesData} />
      )}
    </Box>
  );
}
