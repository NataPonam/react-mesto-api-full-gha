import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="popup__container auth">
      <h3 className="popup__title auth">Ой! Страница не найдена!</h3>
      <button
        className="popup__btn lost"
        type="submit"
        onClick={() => navigate(-1)}
      >
        Вернуться назад
      </button>
    </div>
  );
}

export default NotFoundPage;
