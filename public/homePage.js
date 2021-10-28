
let logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout((callback) => {
        if (callback.success) {
            location.reload();
        } 
    });
};


let current = ApiConnector.current((callback) => {
    if (callback.success){
        ProfileWidget.showProfile(callback.data)
    }
});

// Получение текущих курсов валюты

let ratesBoard = new RatesBoard();
function request(){
    ApiConnector.getStocks((callback) => {
        if (callback.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(callback.data);
        }
    })
}

setInterval(request(), 60000);


//Операции с деньгами
//Пополнение баланса
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (callback) => {
        if (callback.success){
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage("Баланс пополнен");//не понятно как работает
        } else{
            moneyManager.setMessage();
        }
    })
}

//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (callback) => {
        if (callback.success){
            ProfileWidget.showProfile(callback.data);
            moneyManager.setMessage("Баланс пополнен");//не понятно как работает
        } else{
            alert("Ошибка пополнения баланса")
        }
    })
}

//Перевод
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (callback) => {
        if (callback.success){
            ProfileWidget.showProfile(callback.data);
            setMessage(success, "Баланс пополнен");//не понятно как работает
        } else{
            alert("Ошибка пополнения баланса")
        }
    })
}

//Работа с избранным

let favoritesWidget = new FavoritesWidget();
function requestFavorites (){
    ApiConnector.getFavorites((callback) => {
        if (callback.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
        }   
    })
}
requestFavorites();


favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (callback) => {
        if (callback.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
        } 
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (callback) => {
        if (callback.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(callback.data);
            moneyManager.updateUsersList(callback.data);
        } 
    })
}
