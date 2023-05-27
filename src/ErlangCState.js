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

  const handleChange = (e) => {
    setError(false);
    const fieldName = e.target.name;
    setInfo((info) => ({
      ...info,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    setError(false);

    if (!info.average || !info.intensity || !info.queue || !info.time) {
      setError(true);
      return;
    }

    if (info.average <= 0 || info.intensity <= 0 || info.queue <= 0 || info.time <= 0) {
      setError(true);
      return;
    }

    if (info.queue >= 1) {
      setError(true);
      return;
    }

    if (info.average > 3600 || !Number.isInteger(Number(info.average))) {
      setError(true);
      return;
    }

    if (info.intensity > 100000 || !Number.isInteger(Number(info.intensity))) {
      setError(true);
      return;
    }

    if (info.time > 3600 || !Number.isInteger(Number(info.time))) {
      setError(true);
      return;
    }

    setResult(getMinAgentsCount(info));
    setShowModal(true);
  };

  return (
    <>
      <div className="main__formula">
        <img src={erlangC} alt="erlang-C формула" width={1000} height={100} />
      </div>
      <h3 className="main__title">
        <span style={{ fontWeight: "bold" }}>Калькулятор Эрланга C: </span>
        Расчет минимального количества операторов колл-центра в зависимости от нагрузки.
      </h3>
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
          aria-invalid={error && (!info.queue || info.queue >= 1 || info.queue <= 0)}
        />
      </label>
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
          aria-invalid={error && (!info.average || info.average <= 0 || info.average > 3600 || !Number.isInteger(Number(info.average)))}
        />
      </label>
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
          aria-invalid={
            error && (!info.intensity || info.intensity <= 0 || info.intensity > 100000 || !Number.isInteger(Number(info.intensity)))
          }
        />
      </label>
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
          aria-invalid={error && (!info.time || info.time <= 0 || info.time > 3600 || !Number.isInteger(Number(info.time)))}
        />
      </label>
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
                        | E({lines},{traffic}) = {callResult}
                      </span>
                      <span className="modal__children__items" aria-invalid={placementProbabilityResult <= Number(info.queue)}>
                        | D({lines},{traffic}) = {placementProbabilityResult}
                      </span>
                      <span className="modal__children__items" aria-invalid={waitingTimeInLineResult <= Number(info.average)}>
                        | W({lines},{traffic}) = {waitingTimeInLineResult}
                      </span>
                    </div>
                    {placementProbabilityResult <= Number(info.queue) && waitingTimeInLineResult <= Number(info.average) && (
                      <div className="modal__children__items__container--default">
                        <span>
                          D({lines},{traffic}) ≤ Dnorm
                        </span>
                        <span>
                          W({lines},{traffic}) ≤ Wnorm
                        </span>
                        <span>➜</span>
                        <span style={{ color: "#ff0000" }}>r = {lines}</span>
                      </div>
                    )}
                  </>
                );
              })}
          </div>
        </ModalContainer>
      )}
    </>
  );
};
