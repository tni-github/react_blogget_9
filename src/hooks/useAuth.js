import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../api/const';
import { deleteToken } from '../store';

export const useAuth = () => {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState({});

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/api/v1/me`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error(response.status);
      }
      return response.json();
    })
      .then(({ name, icon_img: iconImg }) => {
        const img = iconImg.replace(/\?.*$/, '');
        setAuth({ name, img });
      })
      .catch((err) => {
        console.error(err);
        dispatch(deleteToken());
        setAuth({});
      });
  }, [token]);

  const clearAuth = () => setAuth({});

  return [auth, clearAuth];
};
