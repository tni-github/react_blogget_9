import style from './Comments.module.css';
import PublicationDate from '../../Main/List/Post/PublicationDate';
import { Text } from '../../../UI/Text';
import PropTypes from 'prop-types';

export const Comments = ({ comments }) => {
  if (comments.length === 0) {
    return <div className={style.list}>No comments yet</div>;
  }

  if (comments.length !== 0 &&
    (!comments[comments.length - 1].subreddit_id ||
    comments[comments.length - 1].kind === 'more')) {
    comments.pop();
  }

  return (
    <ul className={style.list}>
      {
        comments.map((comment) => (
          <li key={comment.id} className={style.item}>
            <Text As='h3' className={style.author} size={18} tsize={22}>
              {comment.author}
            </Text>
            <Text As='p' className={style.comment} size={14} tsize={18}>
              {comment.body}
            </Text>
            <div />
            <PublicationDate date={comment.created}/>
          </li>
        ))
      }
    </ul>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
};
