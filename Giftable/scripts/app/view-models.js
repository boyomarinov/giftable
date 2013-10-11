window.viewModelFactory = (function () {
    var persister = null;
    
    function getLoginViewModel(successCallback) {
        var viewModel = {
            username: "username1",
            password: "123456",
            login: function () {
                persister.users.login(this.get("username"), this.get("password"))
                .then(function () {
                    if (successCallback) {
                        successCallback();
                    }
                });
            }
        };
        return kendo.observable(viewModel);
    };

    function getRegisterViewModel(successCallback) {
        var viewModel = {
            username: "username1",
            password: "123456",
            email: "examplemail@gmail.com",
            register: function () {
                var username = this.get("username");
                var password = this.get("password");
                var email = this.get("email");
                persister.users.register(username, password, email)
                .then(function () {
                    if (successCallback) {
                        successCallback();
                    }
                });
            }
        };
        return kendo.observable(viewModel);
    };
    
    return{
        getLoginViewModel: getLoginViewModel,
        getRegisterViewModel: getRegisterViewModel
    };
}());