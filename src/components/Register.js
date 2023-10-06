import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({registration}) {

    const {values, handleChange} = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        registration(values);
    }

    return (
        <div className="authorization">
            <div className="authorization__container">
                <p className="authorization__title">
                    Регистрация
                </p>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input required id="email" name="email" value={values.email || ""} onChange={handleChange} className="authorization__input" type="text" placeholder="Email"/>
                    <input required id="password" name="password" value={values.password || ""} onChange={handleChange} className="authorization__input" type="password" placeholder="Пароль"/>
                    <button className="authorization__button" type="submit">Зарегестрироваться</button>
                </form>
                <Link to="/sign-in" className="authorization__signin-link">
                    Уже зарегестрированы ? Войти
                </Link>
            </div>
        </div>
    )
}

export default Register;