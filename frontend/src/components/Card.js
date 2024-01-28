import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const likesNumber = props.card.likes.length;
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like ${
    isLiked && "cards__like_active"
  }`;

  return (
    <li className="cards__item">
      {isOwn && (
        <button
          className="cards__trash"
          type="button"
          aria-label="Удалить"
          onClick={props.handleDeleteClick}
        ></button>
      )}
      <div
        className="cards__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={props.handleClick}
      ></div>
      <div className="cards__description">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={props.handleLikeClick}
            type="button"
            aria-label="Лайк"
          ></button>
          <p className="cards__like-counter">{likesNumber}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
