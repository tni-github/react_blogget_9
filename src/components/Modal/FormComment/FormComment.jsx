import { Text } from '../../../UI/Text';
import style from './FormComment.module.css';
import { authContext } from '../../../context/authContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../../store';

export const FormComment = ({ isFormCommentOpen, openFormComment }) => {
  // const store = useStore();
  // const value = store.getState().comment;
  const value = useSelector(state => state.comment);
  const dispatch = useDispatch();

  const { auth } = useContext(authContext);
  // const sendRef = useRef(null);
  // const textRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(value);
    // const target = e.target;
    // if (target === sendRef.current) {
    //   console.log(textRef.current.value);
    //   textRef.current.value = '';
    //   textRef.current.focus();
  };

  const handleChange = e => {
    dispatch(updateComment(e.target.value));
  };

  // useEffect(() => {
  //   document.addEventListener('click', handleSubmit);

  //   return () => {
  //     document.removeEventListener('click', handleSubmit);
  //   };
  // }, []);

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {!isFormCommentOpen ?
        <button
          className={style.btn}
          onClick={openFormComment}>
          Написать комментарий
        </button> :
        <>
          <Text As='h3' size={14} tsize={18}>
            {auth.name}
          </Text>
          <textarea
            className={style.textarea}
            value={value}
            onChange={handleChange}
            autoFocus
          >
          </textarea>
          <button className={style.btn}>
            Отправить
          </button>
        </>
      }
    </form>
  );
};

FormComment.propTypes = {
  isFormCommentOpen: PropTypes.bool,
  openFormComment: PropTypes.func,
};
