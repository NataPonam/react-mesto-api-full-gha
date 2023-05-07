import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({
  card,
  src,
  title,
  likes,
  handleCardClick,
  onCardClick,
  onCardLike,
  onDeleteCard,
  onDeleteBtn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__btn ${isLiked && 'card__btn_liked'}`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  /*function handleDeleteCard() {
    onDeleteCard(card);
  }*/

  function handleDeleteCardByBtn() {
    onDeleteBtn(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__trash"
          type="button"
          aria-label="удалить"
          onClick={handleDeleteCardByBtn}
        />
      )}
      <img
        className="card__img"
        src={src}
        alt={title}
        onClick={handleCardClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{title}</h2>
        <div className="card__count-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}
          />
          <p className="card__count-like">{likes}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
