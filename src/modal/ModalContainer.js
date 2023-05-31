import { createPortal } from "react-dom";

export const ModalContainer = (props) => {
  return createPortal(
    <>
      <div className="modal__shadow" onClick={props.handleClose} />
      <div className={`modal ${props.parentClass}`}>
        <div className="modal__container">
          <p className="modal__title">{props.title || "Заголовок"}</p>
          <button type="button" className="modal__close" onClick={props.handleClose}>
            <div className={`modal__close__stick modal__close__stick--left`} />
            <div className={`modal__close__stick modal__close__stick--right`} />
          </button>
        </div>
        <div className={`modal__children md:px-4 md:pt-3 ${props.className}`}>{props.children}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};
