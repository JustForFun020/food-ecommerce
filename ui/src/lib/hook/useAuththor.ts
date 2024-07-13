import _ from 'lodash';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef, useState } from 'react';

interface JwtUserProps {
  id: number;
  role: {
    roleId: number;
  }[];
}

export const useAuththor = () => {
  const [currentUser, setCurrentUser] = useState<JwtUserProps>({} as JwtUserProps);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const token = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Effect for setting the user based on the token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      token.current = storedToken;
      if (storedToken) {
        try {
          const decodedUser = jwtDecode<JwtUserProps>(storedToken); // Ensure jwtDecode is correctly typed
          setCurrentUser(decodedUser);
        } catch (err) {
          setError('Failed to decode token');
        }
      }
    }
  }, []); // Removed currentUser from dependencies to avoid infinite loop

  // Separate effect for setting isAdmin based on currentUser changes
  useEffect(() => {
    if (currentUser && currentUser.role) {
      const isAdmin = _.some(currentUser.role, { roleId: 1 });
      setIsAdmin(isAdmin);
    }
  }, [currentUser]); // Depend only on currentUser

  return { token: token.current, currentUser, isAdmin, error };
};
