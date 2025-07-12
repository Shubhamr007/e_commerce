import { useState, useEffect } from 'react';

/**
 * useApiResource - robust API fetch hook for React
 * @param {string} url - API endpoint
 * @param {object} [options] - fetch options (method, headers, etc.)
 * @param {Array} [deps] - dependencies to re-fetch
 * @returns {object} { data, error, loading, refetch }
 */
export default function useApiResource(url, options = {}, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    const mergedOptions = { ...options };
    mergedOptions.headers = {
      ...(options.headers || {}),
      ...(token && !('Authorization' in (options.headers || {})) ? { Authorization: `Bearer ${token}` } : {})
    };
    fetch(url, mergedOptions)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText || 'API error');
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [url, JSON.stringify(options), ...deps]);

  return { data, error, loading, refetch: fetchData };
}
