import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  return (
    <PopupWithForm
      name="profile-form"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
    >
      <input
        id="input-profileName"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        autoComplete="off"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        value={name || ''}
        onChange={handleChangeName}
        required
      />
      <span className="popup__input-error input-profileName-error" />

      <input
        id="input-profileInfo"
        className="popup__input popup__input_type_info"
        type="text"
        name="about"
        autoComplete="off"
        placeholder="Вид деятельности"
        minLength={2}
        maxLength={200}
        value={description || ''}
        onChange={handleChangeAbout}
        required
      />
      <span className="popup__input-error input-profileInfo-error" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
