import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Visits() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVisits() {
      try {
        const res = await api.get('/admin/visits');
        setVisits(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchVisits();
  }, []);

  if (loading) return <p>Loading log...</p>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Global Audit Log</h1>
        <p>Complete historical timeline of every entry via the society gates.</p>
      </div>

      <div className="glass-panel table-container">
        <table>
          <thead>
            <tr>
              <th>Visitor</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Dest. Flat</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {visits.map(visit => (
              <tr key={visit.id}>
                <td style={{ fontWeight: '500' }}>{visit.visitorName}</td>
                <td style={{ color: 'var(--text-muted)' }}>{visit.visitorPhone}</td>
                <td>{visit.purpose}</td>
                <td style={{ fontWeight: '600', color: 'var(--primary)' }}>{visit.flatNumber}</td>
                <td style={{ fontSize: '0.875rem' }}>
                  {new Date(visit.entryTime).toLocaleString()}
                </td>
                <td>
                  <span className={`badge ${visit.status.toLowerCase()}`}>
                    {visit.status}
                  </span>
                </td>
              </tr>
            ))}
            {visits.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                  No visit logs recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
