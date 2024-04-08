import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminRouteGuard = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/validate-token', {
          method: 'POST',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid && data.role === "admin") {
            setAuthenticated(true);
          }
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    validateToken();
  }, []);

  return authenticated ? children : <Navigate to="/login" />;
};

export default AdminRouteGuard;
