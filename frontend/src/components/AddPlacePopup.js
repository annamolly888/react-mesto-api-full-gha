import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({});
  const { place, link } = values;

  useEffect(() => {
    setValues({});
  }, [props.isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      link: link,
      name: place,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="form__input form__input_title"
          id="image-name-input"
          type="text"
          name="place"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={place || ""}
          onChange={handleChange}
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="name-error"
        ></span>
      </label>
      <label className="popup__label">
        <input
          className="form__input form__input_link"
          id="image-url-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          value={link || ""}
          onChange={handleChange}
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="link-error"
        ></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
