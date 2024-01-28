import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function changeName(e) {
    setName(e.target.value);
  }

  function changeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-form"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="form__input form__input_field_name"
          id="profile-name-input"
          type="text"
          name="title"
          placeholder="Ваше Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={changeName}
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="title-error"
        ></span>
      </label>
      <label className="popup__label">
        <input
          className="form__input form__input_field_job"
          id="profile-job-input"
          type="text"
          name="job"
          placeholder="Введите описание"
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={changeDescription}
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="job-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
