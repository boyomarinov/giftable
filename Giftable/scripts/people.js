var app = app || {};

(function(a) {
    var persister = persisters.get("http://localhost:30765/api/");
    
    function init(e) {
        persister.users.friends()
        .then(function(data) {
            console.log(data);
            $("#custom-people-listview").kendoMobileListView({
                dataSource: data,
                template: $("#people-list-template").html()
            });
        }, function(error) {
            console.log(error);
        })
    }   
    
    function logout() {
        persister.users.logout()
        .then(function(data){
            app.application.navigate("views/login.html#login-view");
        }, function(err){
            console.log(err);
        });
    }
    
    a.people = {
        init:init,
        logout: logout
    };
}(app));