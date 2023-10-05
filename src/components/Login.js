import React, { useState } from "react";

function Login({login}) {

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
        login(formValue);
    }

    return (
        <div className="authorization">
            <div className="authorization__container">
                <p className="authorization__title">
                    Вход
                </p>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input required value={formValue.email || ""} onChange={handleChange} className="authorization__input" type="text" id="email" name="email" placeholder="Email"/>
                    <input required value={formValue.password || ""} onChange={handleChange} className="authorization__input" type="password" id="password" name="password" placeholder="Пароль"/>
                    <button className="authorization__button" type="submit">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login;