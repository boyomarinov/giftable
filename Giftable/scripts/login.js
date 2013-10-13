(function (global) {
    //var persister = persisters.get("http://giftable.apphb.com/api/")
    var persister = persisters.get();
    var LoginViewModel,
    app = global.app = global.app || {};

    LoginViewModel = kendo.data.ObservableObject.extend({
       
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        username: localStorage.getItem("username") || "",
        password: "",
        accessToken: localStorage.getItem("accessToken"),
        
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
                localStorage.setItem("username", username);
                console.log(localStorage.getItem("accessToken"));
                
                app.application.navigate("views/people.html#people-view");
            }, function(err) {
                console.log(err);
            });
            //self.set("isLoggedIn", true);
        },
        register: function() {
            console.log(app);
            app.application.navigate("views/register.html#register-view");
        }
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
      /*  checkLogin: function() {
            if (persister.users.isLoggedIn()) {
                app.application.navigate("views/people.html#people-view");
                console.log("logged in");
            }
            else {
                app.application.navigate("#login-view");
                console.log("not logged in");
            }
        },*/
        viewModel: new LoginViewModel()
    };
})(window);