import React, { useState } from "react";
import erlangB from "./images/erlang-b.png";
import { getCallResult, getLinesResult, getTrafficResult } from "./utils/formulaB";
import { ModalContainer } from "./modal/ModalContainer";

const defaultInfo = {
  call: "",
  lines: "",
  traffic: "",
};

export const ErlangBState = () => {
  const [erlangBType, setErlangBType] = useState("call");
  const [info, setInfo] = useState(defaultInfo);
  const [result, setResult] = useState();

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessageCall, setErrorMessageCall] = useState("");
  const [errorMessageLines, setErrorMessageLines] = useState("");
  const [errorMessageTraffic, setErrorMessageTraffic] = useState("");

  const handleCheck = (type) => {
    setInfo(defaultInfo);
    setError(false);
    setErrorMessageCall("");
    setErrorMessageLines("");
    setErrorMessageTraffic("");
    setErlangBType(type);
  };

  const handleChange = (e) => {
    setError(false);
    setErrorMessageCall("");
    setErrorMessageLines("");
    setErrorMessageTraffic("");
    const fieldName = e.target.name;
    setInfo((info) => ({
      ...info,
      [fieldName]: e.target.value,
    }));
  };

  const errorHandlerCall = () => {
    return !info.call || info.call >= 1 || info.call <= 0;
  };

  const errorHandlerLines = () => {
    return !info.lines || info.lines <= 0 || !Number.isInteger(Number(info.lines)) || info.lines > 180;
  };

  const errorHandlerTraffic = () => {
    return !info.traffic || info.traffic <= 0 || info.traffic > 180;
  };

  const handleSubmit = () => {
    setError(false);
    switch (erlangBType) {
      case "call":
        if (errorHandlerTraffic() || errorHandlerLines()) {
          setError(true);
          if (!info.traffic) {
            setErrorMessageTraffic("Поле должно быть заполнено");
          } else if (info.traffic <= 0) {
            setErrorMessageTraffic("Число должно быть больше 0");
          } else if (info.traffic > 180) {
            setErrorMessageTraffic("Трафик не может превышать 180");
          }

          if (!info.lines) {
            setErrorMessageLines("Поле должно быть заполнено");
          } else if (info.lines <= 0) {
            setErrorMessageLines("Число должно быть больше 0");
          } else if (!Number.isInteger(Number(info.lines))) {
            setErrorMessageLines("Количество линий должно быть целом числом");
          } else if (info.lines > 180) {
            setErrorMessageLines("Количество линий не может превышать 180");
          }
          return;
        }
        setResult(getCallResult(info));
        setShowModal(true);
        break;
      case "lines":
        if (errorHandlerTraffic() || errorHandlerCall()) {
          setError(true);
          if (!info.traffic) {
            setErrorMessageTraffic("Поле должно быть заполнено");
          } else if (info.traffic <= 0) {
            setErrorMessageTraffic("Число должно быть больше 0");
          } else if (info.traffic > 180) {
            setErrorMessageTraffic("Трафик не может превышать 180");
          }

          if (!info.call) {
            setErrorMessageCall("Поле должно быть заполнено");
          } else if (info.call <= 0) {
            setErrorMessageCall("Число должно быть больше 0");
          } else if (info.call >= 1) {
            setErrorMessageCall("Вероятность потери вызова не может быть больше или равно 1");
          }
          return;
        }
        setResult(getLinesResult(info));
        setShowModal(true);
        break;
      case "traffic":
        if (errorHandlerLines() || errorHandlerCall()) {
          setError(true);
          if (!info.lines) {
            setErrorMessageLines("Поле должно быть заполнено");
          } else if (info.lines <= 0) {
            setErrorMessageLines("Число должно быть больше 0");
          } else if (!Number.isInteger(Number(info.lines))) {
            setErrorMessageLines("Количество линий должно быть целом числом");
          } else if (info.lines > 180) {
            setErrorMessageLines("Количество линий не может превышать 180");
          }

          if (!info.call) {
            setErrorMessageCall("Поле должно быть заполнено");
          } else if (info.call <= 0) {
            setErrorMessageCall("Число должно быть больше 0");
          } else if (info.lines >= 1) {
            setErrorMessageCall("Вероятность потери вызова не может быть больше или равно 1");
          }
          return;
        }
        setResult(getTrafficResult(info));
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const getTitleFromType = () => {
    switch (erlangBType) {
      case "call":
        return "Вероятность потери вызова";
      case "lines":
        return "Количество линий";
      case "traffic":
        return "Предлагаемый трафик";
      default:
        return "Заголовок";
    }
  };

  return (
    <>
      <div className="main__formula">
        <picture>
          <source srcSet={erlangB} width="700" height="150" media="(min-width: 1001px)" type="image/png" />
          <source srcSet={erlangB} width="500" height="100" media="(min-width: 1px)" type="image/png" />
          <img src={erlangB} alt="erlangB формула" width={500} height={100} />
        </picture>
      </div>
      <div className="form__radio__group">
        <div className="form__radio__group-item">
          <input id="radio-1" type="radio" name="radio" checked={erlangBType === "call"} onChange={() => handleCheck("call")} />
          <label htmlFor="radio-1">Вероятность потери вызова</label>
        </div>
        <div className="form__radio__group-item">
          <input id="radio-2" type="radio" name="radio" checked={erlangBType === "lines"} onChange={() => handleCheck("lines")} />
          <label htmlFor="radio-2">Количество линий</label>
        </div>
        <div className="form__radio__group-item">
          <input id="radio-3" type="radio" name="radio" checked={erlangBType === "traffic"} onChange={() => handleCheck("traffic")} />
          <label htmlFor="radio-3">Предлагаемый трафик</label>
        </div>
      </div>
      <h3 className="main__title">
        <span style={{ fontWeight: "bold" }}>Калькулятор Эрланга B: </span>
        {erlangBType === "call" && "калькулятор находит потери вызова из предлагаемого трафика за заданное число линий."}
        {erlangBType === "lines" && "калькулятор находит число линий из вероятности вероятности потери вызова и предлагаемого трафика."}
        {erlangBType === "traffic" && "калькулятор находит предлагаемый трафик из потери вызова за заданное число линий."}
      </h3>
      {erlangBType !== "call" && (
        <div>
          <label htmlFor="Probability of losing a call" className="label">
            <p className="label__text">Вероятность потери вызова: (E(r,a))</p>
            <input
              placeholder="Введите число (от 0.001 до 0.999)"
              type="number"
              name="call"
              id="Probability of losing a call"
              className="input__container"
              value={info.call}
              onChange={handleChange}
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invalid={error && errorHandlerCall()}
            />
          </label>
          {errorMessageCall && errorHandlerCall() && <div className="label__error">{errorMessageCall}</div>}
        </div>
      )}
      {erlangBType !== "lines" && (
        <div>
          <label htmlFor="Number of lines" className="label">
            <p className="label__text">Количество линий: (r)</p>
            <input
              placeholder="Введите число (от 1 до 180)"
              type="number"
              name="lines"
              id="Number of lines"
              className="input__container"
              value={info.lines}
              onChange={handleChange}
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invalid={error && errorHandlerLines()}
            />
          </label>
          {errorMessageLines && errorHandlerLines() && <div className="label__error">{errorMessageLines}</div>}
        </div>
      )}
      {erlangBType !== "traffic" && (
        <div>
          <label htmlFor="Offered traffic" className="label">
            <p className="label__text">Предлагаемый трафик: (a)</p>
            <input
              placeholder="Введите число (от 0.1 до 180)"
              type="number"
              name="traffic"
              id="Offered traffic"
              className="input__container"
              value={info.traffic}
              onChange={handleChange}
              // eslint-disable-next-line jsx-a11y/aria-props
              aria-invalid={error && errorHandlerTraffic()}
            />
          </label>
          {errorMessageTraffic && errorHandlerTraffic() && <div className="label__error">{errorMessageTraffic}</div>}
        </div>
      )}
      <div className="submit__container">
        <button type="button" className="main__button main__button--submit" onClick={handleSubmit}>
          Рассчитать
        </button>
      </div>
      {showModal && (
        <ModalContainer handleClose={() => setShowModal(false)} title={getTitleFromType()}>
          <div className="modal__children__container">
            {result &&
              Object.entries(result).map((val, index) => {
                return (
                  <div key={index} className="modal__children__items__container--b">
                    {erlangBType === "call" && (
                      <>
                        <p className="modal__children__items" aria-invalid={val[0] === info.lines}>{`r = ${val[0]},`}</p>
                        <p className="modal__children__items" aria-invalid={val[0] === info.lines}>{`E(${val[0]}, ${info.traffic}) = ${val[1].toPrecision(
                          10
                        )}`}</p>
                      </>
                    )}

                    {erlangBType === "lines" && (
                      <>
                        <p>{`r = ${val[0]},`}</p>
                        <p>{`E(${val[0]}, ${info.traffic}) = ${val[1].toPrecision(10)}`}</p>
                      </>
                    )}
                    {erlangBType === "lines" && val[1].toPrecision(10) < info.call && (
                      <>
                        <p style={{ paddingTop: "16px" }} className="modal__children__items" aria-invalid={true}>
                          {`r = ${Number(val[0]) + 1},`}
                        </p>
                        <p style={{ paddingTop: "16px" }} className="modal__children__items" aria-invalid={true}>{`E(${val[0]}, ${info.traffic}) < ${
                          info.call
                        } => r = ${Number(val[0]) + 1}`}</p>
                      </>
                    )}

                    {erlangBType === "traffic" && (
                      <>
                        <p>{`a = ${val[0]},`}</p>
                        <p>{`E(${info.lines}, ${val[0]}) = ${val[1]}`}</p>
                      </>
                    )}
                    {erlangBType === "traffic" && val[1] >= info.call && (
                      <>
                        <p style={{ paddingTop: "16px" }} className="modal__children__items" aria-invalid={true}>
                          {`a = ${val[0]},`}
                        </p>
                        <p
                          style={{ paddingTop: "16px" }}
                          className="modal__children__items"
                          aria-invalid={true}
                        >{`E(${info.lines},${val[0]}) = ${val[1]} ≥ ${info.call} => a = ${val[0]}`}</p>
                      </>
                    )}
                  </div>
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
