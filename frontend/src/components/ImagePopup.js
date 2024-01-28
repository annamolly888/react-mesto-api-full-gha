import React from "react";
import useClosedByEsc from "../hooks/useClosedByEsc";

function ImagePopup({ card, isOpen, onClose }) {
  const className = `popup popup_type_image ${isOpen ? "popup_opened" : ""}`;

  useClosedByEsc({ isOpen, onClose });

  return (
    <div
      className={className}
      onClick={(e) => e.target.classList.contains("popup") && onClose()}
    >
      <div className="popup__container-img">
        <button
          className="popup__close-button popup__close-button_img"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__img" src={card.link} alt={card.name} />
          <figcaption className="popup__description">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
