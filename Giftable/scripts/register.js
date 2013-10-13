(function (global) {
    //var persister = persisters.get("http://giftable.apphb.com/api/")
    var persister = persisters.get("http://localhost:30765/api/")
    var RegisterViewModel,
    app = global.app = global.app || {};

    RegisterViewModel = kendo.data.ObservableObject.extend({
        
        username: "",
        password: "",
        email: "",
        
        register: function () {
            var self = this;
            var username = self.get("username").trim();
            var password = self.get("password").trim();
            var email = self.get("email").trim()

            if (username === "" || password === "" || email === "") {
                navigator.notification.alert("All fields are required!",
                                             function () {
                                             }, "Register failed", 'OK');

                return;
            }
            
            persister.users.register(username, password, email)
            .then(function() {
                app.application.navigate('views/login.html#login-view');
            }, function(err) {
                console.log(err);
            });
        },
        backToLogin: function() {
            app.application.navigate('views/login.html#login-view');
        }    
    });

    app.registerService = {
        viewModel: new RegisterViewModel()
    };
})(window);