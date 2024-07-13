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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      token.current = localStorage.getItem('token');
      if (token.current) {
        try {
          const decodeToken = jwtDecode<JwtUserProps>(token.current);
          setCurrentUser(decodeToken);
          setIsAdmin(decodeToken.role.some((role) => role.roleId === 1));
        } catch (error) {
          setError('Token is invalid');
        }
      }
    }
  }, []);

  return { token: token.current, currentUser, isAdmin, error };
};
