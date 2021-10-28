"use strict";


let userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (callback) => {
        if (callback.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`Не правильно введены логин или пароль: ${callback.error}`);
        }
    });
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (callback) => {
        if (callback.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(`Ошибка регистрации нового пользователя ${data.login}: ${callback.error}`);
        }
    });
}


