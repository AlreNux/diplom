import { createPortal } from "react-dom";

export const ModalContainer = (props) => {
  return createPortal(
    <>
      <div className="modal__shadow" onClick={props.handleClose} />
      <div
        className={`modal sx:left-0 sx:my-0 sx:mx-[10px] ${props.parentClass} md:top-0 md:left-0 md:translate-y-0 md:translate-x-0 md:rounded-[0px] md:h-full md:max-h-full md:!m-0`}
      >
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
