import "./styles/index.css";
import logotype from "./images/logotype.png";

import { useState } from "react";
import { ErlangCState } from "./ErlangCState";
import { ErlangBState } from "./ErlangBState";

export const App = () => {
  const [erlang, setErlang] = useState("");

  const handleClick = (type) => {
    setErlang(type);
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logotype} alt="logotype mtuci" />
        <p>Калькулятор Эрланга {erlang}</p>
      </header>
      <div className="buttons__container">
        <button type="button" className="main__button" onClick={() => handleClick("B")}>
          Эрланг B
        </button>
        <button type="button" className="main__button" onClick={() => handleClick("C")}>
          Эрланг C
        </button>
      </div>
      <form className="main__container">
        {!erlang && (
          <>
            <h2 className="main__description__title">КАК ПОЛЬЗОВАТЬСЯ КАЛЬКУЛЯТОРОМ?</h2>
            <p>⦁ Выберите тип модели калькулятора Эрланга</p>
            <p>⦁ Введите данные в поля редактирования</p>
            <p>{`⦁ Нажмите кнопку <<Рассчитать>>.`}</p>
            <p>⦁ Вы получите таблицу рассчитанных значений число операторов, необходимого для работы центра</p>
          </>
        )}
        {erlang === "B" && (
          <>
            <button type="button" onClick={() => handleClick("")} className="backstep__button">
              ← Назад
            </button>
            <ErlangBState />
          </>
        )}
        {erlang === "C" && (
          <>
            <button type="button" onClick={() => handleClick("")} className="backstep__button">
              ← Назад
            </button>
            <ErlangCState />
          </>
        )}
      </form>
    </div>
  );
};
