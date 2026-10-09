import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import { getStatistics } from '../../services/statisticsService';
import { getErrorMessage } from '../../services/api';
import Loading from '../loading/Loading';
import '../styles/Dashboard.css';

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#7c3aed'];

const shortTitle = (title) => (title.length > 14 ? title.slice(0, 14) + '…' : title);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchStatistics = async () => {
      try {
        const result = await getStatistics();
        if (!ignore) setStats(result);
      } catch (err) {
        console.error(err);
        if (!ignore) setError(getErrorMessage(err, 'Failed to load statistics.'));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchStatistics();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setError('');
    setReloadKey((key) => key + 1);
  };

  if (loading) return <Loading message="Loading dashboard..." />;

  if (error) {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p className="no-blogs">{error}</p>
        <button onClick={handleRetry}>Try Again</button>
      </div>
    );
  }

  const chartData = stats.blogs.map((b) => ({
    name: shortTitle(b.title),
    Views: b.views,
    Likes: b.likes,
    Comments: b.comments,
  }));

  const kpis = [
    { label: 'Total Blogs', value: stats.totalBlogs },
    { label: 'Total Views', value: stats.totalViews },
    { label: 'Total Likes', value: stats.totalLikes },
    { label: 'Total Comments', value: stats.totalComments },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <span className="kpi-value">{kpi.value}</span>
            <span className="kpi-label">{kpi.label}</span>
          </div>
        ))}
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Views per Blog</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Views" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Likes vs Comments</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Likes" fill="#16a34a" />
                <Bar dataKey="Comments" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h3>Blogs by Category</h3>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.byCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                  {stats.byCategory.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;