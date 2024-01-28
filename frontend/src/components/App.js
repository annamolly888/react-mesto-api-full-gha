import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipCorrect, setIsInfoTooltipCorrect] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, data]) => {
          setCurrentUser(userData);
          setCards(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setIsImagePopupOpen(true);
  }

  function handleConfirmPopupClick(data) {
    setSelectedCard(data);
    setIsConfirmPopupOpen(true);
  }

  const closeAllPopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .changeUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(userInfo) {
    setIsLoading(true);
    api
      .changeUserAvatar(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setIsLoading(false));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsInfoTooltipCorrect(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipCorrect(false);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          setUserEmail(`${email}`);
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        setIsInfoTooltipCorrect(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(`${res.data.email}`);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="project">
        <div className="page">
          <Header email={userEmail} onLogout={handleLogout} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmPopupClick}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  title="Регистрация"
                  buttonText="Зарегистрироваться"
                  onRegister={handleRegister}
                />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login title="Вход" buttonText="Войти" onLogin={handleLogin} />
              }
            />

            <Route
              path="*"
              element={
                loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>

          {loggedIn && <Footer />}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            onClose={closeAllPopups}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ConfirmDeletePopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
            card={selectedCard}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isCorrect={isInfoTooltipCorrect}
            title={
              isInfoTooltipCorrect
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте еще раз."
            }
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
