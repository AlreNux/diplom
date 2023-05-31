import React, { useState } from "react";
import erlangC from "./images/erlang-c.png";
import { ModalContainer } from "./modal/ModalContainer";
import { getMinAgentsCount } from "./utils/formulaC";

const defaultInfo = {
  queue: "",
  average: "",
  intensity: "",
  time: "",
};

export const ErlangCState = () => {
  const [info, setInfo] = useState(defaultInfo);
  const [result, setResult] = useState();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessageAverage, setErrorMessageAverage] = useState("");
  const [errorMessageIntensity, setErrorMessageIntensity] = useState("");
  const [errorMessageQueue, setErrorMessageQueue] = useState("");
  const [errorMessageTime, setErrorMessageTime] = useState("");

  const handleChange = (e) => {
    setError(false);
    const fieldName = e.target.name;
    setInfo((info) => ({
      ...info,
      [fieldName]: e.target.value,
    }));
  };

  const errorHandlerAverage = () => {
    return !info.average || info.average > 3600 || !Number.isInteger(Number(info.average)) || info.average <= 0;
  };

  const errorHandlerIntensity = () => {
    return !info.intensity || info.intensity <= 0 || info.intensity > 100000 || !Number.isInteger(Number(info.intensity));
  };

  const errorHandlerQueue = () => {
    return !info.queue || info.queue <= 0 || info.queue >= 1;
  };

  const errorHandlerTime = () => {
    return !info.time || info.time <= 0 || info.time > 3600 || !Number.isInteger(Number(info.time));
  };

  const handleSubmit = () => {
    setError(false);

    if (errorHandlerAverage() || errorHandlerIntensity() || errorHandlerQueue() || errorHandlerTime()) {
      setError(true);
      if (!info.average) {
        setErrorMessageAverage("Поле должно быть заполнено");
      } else if (info.average <= 0) {
        setErrorMessageAverage("Число должно быть больше 0");
      } else if (info.average > 3600) {
        setErrorMessageAverage("Среднее время ожидания не может превышать 3600");
      } else if (!Number.isInteger(Number(info.average))) {
        setErrorMessageAverage("Среднее время ожидания должно быть целым числом");
      }

      if (!info.intensity) {
        setErrorMessageIntensity("Поле должно быть заполнено");
      } else if (info.intensity <= 0) {
        setErrorMessageIntensity("Число должно быть больше 0");
      } else if (info.intensity > 100000) {
        setErrorMessageIntensity("Интенсивность не может превышать 100000");
      } else if (!Number.isInteger(Number(info.intensity))) {
        setErrorMessageIntensity("Интенсивность должно быть целым числом");
      }

      if (!info.queue) {
        setErrorMessageQueue("Поле должно быть заполнено");
      } else if (info.queue <= 0) {
        setErrorMessageQueue("Число должно быть больше 0");
      } else if (info.queue >= 1) {
        setErrorMessageQueue("Вероятность постановки не может быть больше или равно 1");
      }

      if (!info.time) {
        setErrorMessageTime("Поле должно быть заполнено");
      } else if (info.time <= 0) {
        setErrorMessageTime("Число должно быть больше 0");
      } else if (info.time > 3600) {
        setErrorMessageTime("Среднее время обслуживания заявки не может превышать 3600");
      } else if (!Number.isInteger(Number(info.time))) {
        setErrorMessageTime("Среднее время обслуживания заявки должно быть целым числом");
      }
      return;
    }

    setResult(getMinAgentsCount(info));
    setShowModal(true);
  };

  return (
    <>
      <div className="main__formula">
        <picture>
          <source srcSet={erlangC} width="1000" height="100" media="(min-width: 1001px)" type="image/png" />
          <source srcSet={erlangC} width="300" height="50" media="(min-width: 1px)" type="image/png" />
          <img src={erlangC} alt="erlangC формула" width={300} height={50} />
        </picture>
      </div>
      <h3 className="main__title">
        <span style={{ fontWeight: "bold" }}>Калькулятор Эрланга C: </span>
        Расчет минимального количества операторов колл-центра в зависимости от нагрузки.
      </h3>
      <div>
        <label htmlFor="Probability of being put in the queue" className="label">
          <span className="label__text">Вероятность постановки в очередь: (D norm)</span>
          <input
            placeholder="Введите число (от 0.001 до 0.999)"
            type="number"
            name="queue"
            id="Probability of being put in the queue"
            className="input__container"
            value={info.queue}
            onChange={handleChange}
            // eslint-disable-next-line jsx-a11y/aria-props
            aria-invalid={error && errorHandlerQueue()}
          />
        </label>
        {errorMessageQueue && errorHandlerQueue() && <div className="label__error">{errorMessageQueue}</div>}
      </div>
      <div>
        <label htmlFor="Average waiting time in the queue" className="label">
          <span className="label__text">Среднее время ожидания в очереди: (W norm)</span>
          <input
            placeholder="Введите число (от 1 до 3600)"
            type="number"
            name="average"
            id="Average waiting time in the queue"
            className="input__container"
            value={info.average}
            onChange={handleChange}
            // eslint-disable-next-line jsx-a11y/aria-props
            aria-invalid={error && errorHandlerAverage()}
          />
        </label>
        {errorMessageAverage && errorHandlerAverage() && <div className="label__error">{errorMessageAverage}</div>}
      </div>
      <div>
        <label htmlFor="Intensity of requests" className="label">
          <span className="label__text">Интенсивность поступления заявок: (λ)</span>
          <input
            placeholder="Введите число (от 1 до 100000)"
            type="number"
            name="intensity"
            id="Intensity of requests"
            className="input__container"
            value={info.intensity}
            onChange={handleChange}
            // eslint-disable-next-line jsx-a11y/aria-props
            aria-invalid={error && errorHandlerIntensity()}
          />
        </label>
        {errorMessageIntensity && errorHandlerIntensity() && <div className="label__error">{errorMessageIntensity}</div>}
      </div>
      <div>
        <label htmlFor="Average application service time" className="label">
          <span className="label__text">Среднее время обслуживания заявки: (1/µ c)</span>
          <input
            placeholder="Введите число (от 1 до 3600)"
            type="number"
            name="time"
            id="Average application service time"
            className="input__container"
            value={info.time}
            onChange={handleChange}
            // eslint-disable-next-line jsx-a11y/aria-props
            aria-invalid={error && errorHandlerTime()}
          />
        </label>
        {errorMessageTime && errorHandlerTime() && <div className="label__error">{errorMessageTime}</div>}
      </div>
      <div className="submit__container">
        <button type="button" className="main__button main__button--submit" onClick={handleSubmit}>
          Рассчитать
        </button>
      </div>
      {showModal && (
        <ModalContainer handleClose={() => setShowModal(false)} title="Минимальное число операторов">
          <div className="modal__children__container">
            {result &&
              Object.entries(result).map(([lines, [callResult, placementProbabilityResult, waitingTimeInLineResult, traffic]], index) => {
                return (
                  <>
                    <div key={index} className="modal__children__items__container--c">
                      <span className="modal__children__items">r = {lines}</span>
                      <span className="modal__children__items">
                        | E({lines},{Number(traffic).toFixed(3)}) = {callResult}
                      </span>
                      <span className="modal__children__items" aria-invalid={placementProbabilityResult <= Number(info.queue)}>
                        | D({lines},{Number(traffic).toFixed(3)}) = {placementProbabilityResult}
                      </span>
                      <span className="modal__children__items" aria-invalid={waitingTimeInLineResult <= Number(info.average)}>
                        | W({lines},{Number(traffic).toFixed(3)}) = {waitingTimeInLineResult}
                      </span>
                    </div>
                    {placementProbabilityResult <= Number(info.queue) && waitingTimeInLineResult <= Number(info.average) && (
                      <div className="modal__children__items__container--default">
                        <span>
                          D({lines},{Number(traffic).toFixed(3)}) ≤ Dnorm
                        </span>
                        <span>
                          W({lines},{Number(traffic).toFixed(3)}) ≤ Wnorm
                        </span>
                        <span>➜</span>
                        <span style={{ color: "#ff0000" }}>r = {lines}</span>
                      </div>
                    )}
                  </>
                );
              })}
            <button type="button" onClick={() => setShowModal(false)} className="backstep__button">
              ← Закрыть
            </button>
          </div>
        </ModalContainer>
      )}
    </>
  );
};
