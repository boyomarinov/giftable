(function (global) {
    var persister = persisters.get("http://localhost:30765/Simulator/api/")
    var LoginViewModel,
    app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
        /* isLoggedIn: false,
        username: "",
        password: "",*/
        /*  var isLoggedIn = localStorage.getItem("isLoggedIn");
        var username = localStorage.getItem("username");
        var accessToken = localStorage.getItem("accessToken");*/
        

        login: function () {
            var self = this;
            var username = self.get("username").trim();
            var password = self.get("password").trim();

            if (username === "" || password === "") {
                navigator.notification.alert("Both fields are required!",
                                             function () {
                                             }, "Login failed", 'OK');

                return;
            }
            
            persister.users.login(username, password)
            .then(function() {
                app.navigate('#tabstrip-home');
            });
            //self.set("isLoggedIn", true);
        },

       /* onLogout: function () {
            var that = this;

            that.clearForm();
            that.set("isLoggedIn", false);
        },

        clearForm: function () {
            var that = this;

            that.set("username", "");
            that.set("password", "");
        }*/
    });

    app.loginService = {
        viewModel: new LoginViewModel()
    };
})(window);