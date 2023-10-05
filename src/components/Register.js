import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({registration}) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        registration(formValue);
    }

    return (
        <div className="authorization">
        <div className="authorization__container">
            <p className="authorization__title">
                Регистрация
            </p>
            <form className="authorization__form" onSubmit={handleSubmit}>
                <input required id="email" name="email" value={formValue.email || ""} onChange={handleChange} className="authorization__input" type="text" placeholder="Email"/>
                <input required id="password" name="password" value={formValue.password || ""} onChange={handleChange} className="authorization__input" type="password" placeholder="Пароль"/>
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