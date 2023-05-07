import React, { useEffect } from 'react';
import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputEl.current.value,
    });
    console.log(inputEl.current.value);
  }

  return (
    <PopupWithForm
      name="avatar-form"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isLoading={isLoading}
    >
      <input
        id="input-avatar"
        className="popup__input popup__input_type_avatar"
        type="url"
        name="link"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        ref={inputEl}
      />
      <span className="popup__input-error input-avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
