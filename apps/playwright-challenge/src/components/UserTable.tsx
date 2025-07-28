import React from 'react';
import { User } from '../types/user';
import NoCompanyIcon from './NoCompanyIcon';
import './UserTable.css';

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="user-table-container" data-testid="user-table">
      <h2>User Directory</h2>
      
      {users.length === 0 ? (
        <div className="no-data" data-testid="no-users">
          No users found.
        </div>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th data-testid="header-id">ID</th>
              <th data-testid="header-name">Name</th>
              <th data-testid="header-username">Username</th>
              <th data-testid="header-email">Email</th>
              <th data-testid="header-city">City</th>
              <th data-testid="header-phone">Phone</th>
              <th data-testid="header-website">Website</th>
              <th data-testid="header-company">Company</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} data-testid={`user-${user.id}`}>
                <td data-testid={`id-${user.id}`}>{user.id}</td>
                <td data-testid={`name-${user.id}`}>{user.name}</td>
                <td data-testid={`username-${user.id}`}>{user.username}</td>
                <td data-testid={`email-${user.id}`}>{user.email}</td>
                <td data-testid={`city-${user.id}`}>{user.address.city}</td>
                <td data-testid={`phone-${user.id}`}>{user.phone}</td>
                <td data-testid={`website-${user.id}`}>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </td>
                <td data-testid={`company-${user.id}`}>
                  {user.company ? (
                    <span className="company-name">{user.company.name}</span>
                  ) : (
                    <NoCompanyIcon />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable; 