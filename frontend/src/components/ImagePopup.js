import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card.link ? 'popup_opened' : ''} popup_img`}>
      <div className="popup__wrapper">
        <button
          className="popup__close-icon popup__close-icon_big-pic"
          onClick={onClose}
          type="button"
          aria-label="закрыть"
        />
        <figure className="popup__pic">
          <img className="popup__big-pic" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
export default ImagePopup;
