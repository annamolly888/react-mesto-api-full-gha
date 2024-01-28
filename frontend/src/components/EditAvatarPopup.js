import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function changeAvatar() {
    return avatarRef.current.value;
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="profile-form"
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="form__input form__input_avatar"
          id="avatar-url-input"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          onChange={changeAvatar}
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="avatar-url-input"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
