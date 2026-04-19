import { useEffect, useState } from 'react';
import { api } from '../api';

export default function Residents() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/verify`);
      // Update local state instead of full refetch for speed
      setUsers(users.map(u => u.id === id ? { ...u, status: 'VERIFIED' } : u));
    } catch (err) {
      alert('Failed to verify user');
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1>Directory</h1>
          <p>Manage all residents, guards, and admins within the society.</p>
        </div>
      </div>

      <div className="glass-panel table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Flat</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{ fontWeight: '500' }}>{user.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{user.phone}</td>
                <td>
                  <span className={`badge`} style={{ color: 'var(--text-main)' }}>{user.role}</span>
                </td>
                <td>{user.flatNumber || '-'}</td>
                <td>
                  <span className={`badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  {user.status === 'PENDING' ? (
                    <button className="btn-small" onClick={() => handleVerify(user.id)}>
                      Approve
                    </button>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
