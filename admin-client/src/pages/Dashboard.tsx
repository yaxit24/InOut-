import { useEffect, useState } from 'react';
import { api } from '../api';
import { Users, Shield, Clock } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({ residents: 0, pending: 0, visits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, visitsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/visits')
        ]);
        
        const users = usersRes.data;
        const visits = visitsRes.data;

        setStats({
          residents: users.filter((u: any) => u.role === 'resident').length,
          pending: users.filter((u: any) => u.status === 'PENDING').length,
          visits: visits.length
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1>Overview</h1>
      <p>Welcome back to the Admin control center.</p>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon blue"><Users /></div>
          <div className="stat-info">
            <h4>Total Residents</h4>
            <div className="stat-val">{stats.residents}</div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon orange"><Shield /></div>
          <div className="stat-info">
            <h4>Pending Approvals</h4>
            <div className="stat-val">{stats.pending}</div>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon green"><Clock /></div>
          <div className="stat-info">
            <h4>Total Visits Logged</h4>
            <div className="stat-val">{stats.visits}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
