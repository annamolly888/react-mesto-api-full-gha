import React from "react";
import useClosedByEsc from "../hooks/useClosedByEsc";

function PopupWithForm(props) {
  const className = `popup ${props.isOpen ? "popup_opened" : ""}`;
  useClosedByEsc({ isOpen: props.isOpen, onClose: props.onClose });

  return (
    <div
      className={className}
      onClick={(e) => e.target.classList.contains("popup") && props.onClose()}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрытие попапа"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="form"
          action="#"
          name={props.name}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__save-button" type="submit">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
