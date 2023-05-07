 class Api {
   constructor({ url, headers }) {
     this._url = url;
     this._headers = headers;
   }

   /*Common things */
   _checkResponse(res) {
     if (res.ok) {
       return res.json();
     }
     return Promise.reject(`Что-то пошло не так: ${res.status}`);
   }
   //Спасибо!!!!!!!!
   _request(url, options) {
     return fetch(url, options).then(this._checkResponse);
   }

   /*1. Загрузка информации о пользователе с сервера GET https://nomoreparties.co/v1/cohortId/users/me*/
   getUser() {
     return this._request(`${this._url}/users/me`, {
       headers: this._headers,
     });
   }

   /*2. Загрузка карточек с сервера GET https://mesto.nomoreparties.co/v1/cohortId/cards */
   getAllCards() {
     return this._request(`${this._url}/cards`, {
       headers: this._headers,
     });
   }

   /*3. Редактирование профиля PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me  */
   editProfile(user) {
     return this._request(`${this._url}/users/me`, {
       headers: this._headers,
       method: 'PATCH',
       body: JSON.stringify({
         name: user.name,
         about: user.about,
       }),
     });
   }

   /*4. Добавление новой карточки POST https://mesto.nomoreparties.co/v1/cohortId/cards */
   getNewCard(data) {
     return this._request(`${this._url}/cards`, {
       headers: this._headers,
       method: 'POST',
       body: JSON.stringify({
         name: data.name,
         link: data.link,
       }),
     });
   }
   /*7. Удаление карточки DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId  */
   deleteCard(id) {
     return this._request(`${this._url}/cards/${id}`, {
       headers: this._headers,
       method: 'DELETE',
     });
   }

   /*8.1 Постановка лайка PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes */
   addLike(id) {
     return this._request(`${this._url}/cards/${id}/likes`, {
       headers: this._headers,
       method: 'PUT',
     });
   }

   /*8.2 Cнятие лайка DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes*/
   deleteLike(id) {
     return this._request(`${this._url}/cards/${id}/likes`, {
       headers: this._headers,
       method: 'DELETE',
     });
   }

   /*8.3 Изменить статус лайка карточки*/
   changeLikeCardStatus(id, isLiked) {
     if (isLiked) {
       return this._request(`${this._url}/cards/${id}/likes`, {
         headers: this._headers,
         method: 'PUT',
       });
     } else {
       return this._request(`${this._url}/cards/${id}/likes`, {
         headers: this._headers,
         method: 'DELETE',
       });
     }
   }

   //9. Обновление аватара пользователя PATCH https://mesto.nomoreparties.co/v1/cohortId/users/me/avatar
   editAvatar(userInfo) {
     return this._request(`${this._url}/users/me/avatar`, {
       headers: this._headers,
       method: 'PATCH',
       body: JSON.stringify({
         avatar: userInfo.avatar,
       }),
     });
   }
 }

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '2380923a-f5b9-4b4c-879a-8e7b78ad0407',
    'Content-Type': 'application/json'
  }
});
