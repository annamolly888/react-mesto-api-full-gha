import React from "react";
import useClosedByEsc from "../hooks/useClosedByEsc";

function InfoTooltip({ isOpen, onClose, isCorrect, title }) {
  useClosedByEsc({ isOpen, onClose });
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className={"popup__container"}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Кнопка закрыть окно"
          onClick={onClose}
        ></button>
        <div
          className={`popup__auth-image ${
            isCorrect
              ? "popup__auth-image_type_correct"
              : "popup__auth-image_type_incorrect"
          }`}
        />
        <h2 className="popup__auth-heading">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
