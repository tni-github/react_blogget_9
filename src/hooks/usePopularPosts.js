import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { URL_API } from '../api/const';
import { deleteToken } from '../store';

export const usePopularPosts = () => {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then(response => {
      if (response.status === 401) {
        throw new Error(response.status);
      }
      return response.json();
    })
      .then(({ data }) => {
        setPopularPosts(data.children);
      })
      .catch((err) => {
        console.error(err);
        dispatch(deleteToken());
        setPopularPosts([]);
      });
  }, [token]);

  return [popularPosts];
};

