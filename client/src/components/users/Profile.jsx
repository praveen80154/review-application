import React, { useState, useEffect } from 'react';
import fetchProfile from '../../funtions/fetchProfile'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchProfile();
        setUser(user);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h1>My Profile</h1>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
