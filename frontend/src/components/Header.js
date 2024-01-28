import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__auth-link">
              Войти
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__auth-link">
              Регистрация
            </Link>
          }
        />

        <Route
          path="*"
          element={
            <div className="header__container">
              <p className="header__email">{props.email}</p>
              <Link
                to="sign-in"
                className="header__logout"
                onClick={props.onLogout}
              >
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
