import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name="places-form"
      title="Новое место"
      buttonText="Создать"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
    >
      <input
        id="input-place-name"
        className="popup__input popup__input_type_place"
        type="text"
        name="placeName"
        autoComplete="off"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error input-place-name-error" />
      <input
        id="input-place-link"
        className="popup__input popup__input_type_link"
        type="url"
        name="placeLink"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error input-place-link-error" />
    </PopupWithForm>
  );
}
export default AddPlacePopup;
