import React, { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import ErrorModal from './components/ErrorModal';
import { fetchUsers } from './services/api';
import { User } from './types/user';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error('Error loading users:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const closeErrorModal = () => {
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>User Directory</h1>
        <p className="app-subtitle">View and manage your users</p>
      </header>

      <main className="app-content">
        {loading ? (
          <div className="loading-spinner" data-testid="loading-spinner">
            Loading users...
          </div>
        ) : (
          <UserTable users={users} />
        )}
      </main>

      {error && <ErrorModal message={error} onClose={closeErrorModal} />}

      <footer className="app-footer">
        <p>User Directory &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App; 