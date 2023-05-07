import React from 'react';
import { useContext } from 'react';
import profileAvatarEdit from '../images/Vector_btn_edit_320.svg';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main({
  cards,
  onCardClick,
  onCardLike,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onDeleteBtn,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-wrapper">
          <img
            className="profile__avatar-edit"
            src={profileAvatarEdit}
            alt="иконка карандаша"
          />
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </div>
        <div className="profile__container">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__btn-edit"
            type="button"
            aria-label="изменить"
          />
          <p className="profile__info">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__btn-add"
          type="button"
          aria-label="добавить"
        />
      </section>

      <section className="cards">
        {
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                title={card.name}
                likes={card.likes.length}
                src={card.link}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onDeleteBtn={onDeleteBtn}
              />
            ))}
          </ul>
        }
      </section>
    </main>
  );
}

export default Main;
