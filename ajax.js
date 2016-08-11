var Ajax = {
	url: 'http://example.com',
    call: function (method, data, type, dataType, callback) {
    	data._csrf = this._csrf; // Если вы используете csrf
    	
    	$.ajax({
    		url: this.url + '/' + method,
			data: data,
			dataType: dataType,
			type: type,
			statusCode: {
				302: function () { // нет авторизации
					Ajax.showError("Необходимо авторизоваться.");
				},
				422: function(response) { // логическая ошибка
					Ajax.showError(response.message);
				},
				500: function(response) { // 500 Fatal Error
					Ajax.showError("Ошибка на сервере");
				},
			},
			success: function (response) { // 200
				callback(data);
			}
		});
	},
	showError: function (message) {
		console.log(message, 'error');
	},
};//1
