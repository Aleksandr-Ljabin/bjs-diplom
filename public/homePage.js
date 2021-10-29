
let logoutButton = new LogoutButton();

logoutButton.action = () => {
	ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } 
    });
};


let current = ApiConnector.current((response) => {
    if (response.success){
        ProfileWidget.showProfile(response.data)
    }
});

// Получение текущих курсов валюты

let ratesBoard = new RatesBoard();
function request(){
    ApiConnector.getStocks((response) => {
        if (response.success){
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
request();
setInterval(request, 60000);


//Операции с деньгами
//Пополнение баланса
let moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.error || "Баланс пополнен");
        } 
    })
}

//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
        }   moneyManager.setMessage(response.success, response.error || "Баланс пополнен");
    })
}

//Перевод
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, response.error || "Баланс пополнен");
        }
    })
}

//Работа с избранным

let favoritesWidget = new FavoritesWidget();
function requestFavorites (){
    ApiConnector.getFavorites((response) => {
        if (response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }   
    })
}
requestFavorites();

// Добавление в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, response.error || "Пользователь добавлен");
        } 
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, response.error || "Пользователь удален");
        } 
    })
}
