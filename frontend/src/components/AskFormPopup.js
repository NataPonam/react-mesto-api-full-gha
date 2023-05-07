import React from 'react';
import PopupWithForm from './PopupWithForm';

function AskFormPopup({ isOpen, onClose, onDeleteCard, card, isLoading }) {
  function handleCardDelete(e) {
    e.preventDefault();
    onDeleteCard(card);
  }
  return (
    <PopupWithForm
      name="conf-form"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleCardDelete}
      isLoading={isLoading}
    />
  );
}

export default AskFormPopup;
