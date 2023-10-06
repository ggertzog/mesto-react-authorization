import React from "react";
import { useForm } from "../hooks/useForm";

function Login({login}) {

    const {values, handleChange} = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        login(values);
    }

    return (
        <div className="authorization">
            <div className="authorization__container">
                <p className="authorization__title">
                    Вход
                </p>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input required value={values.email || ""} onChange={handleChange} className="authorization__input" type="text" id="email" name="email" placeholder="Email"/>
                    <input required value={values.password || ""} onChange={handleChange} className="authorization__input" type="password" id="password" name="password" placeholder="Пароль"/>
                    <button className="authorization__button" type="submit">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login;