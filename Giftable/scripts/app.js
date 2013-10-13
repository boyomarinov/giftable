(function (global) {
    var mobileSkin = "",
    app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        //app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        app.application = new kendo.mobile.Application(document.body);
        
        var buttongroup = $("#newgift-buttongroup").kendoMobileButtonGroup();
      
        if (device.platform == 'Android') {
            document.getElementById("backButton").style.visibility = "hidden";
        }
       
        //handle if user is logged in 
        /*var persister = persisters.get("http://giftable.apphb.com/api/");
        if(persister.users.isLoggedIn()){
        app.navigate("#tabstrip-home");
        }else{
        app.navigate("views/login.html#login-view");
        }*/
        var persister = persisters.get("http://localhost:30765/api/");
        app.login = {
            check:function() {
                if (persister.users.isLoggedIn()) {
                    app.application.navigate("views/people.html#people-view");
                    console.log("logged in");
                }
                else {
                    app.application.navigate("#login-view");
                    console.log("not logged in");
                }
            }        
        }

        document.addEventListener("backbutton", function (e) {
            var view = app.application.view();
            navigator.notification.alert(view.id);
            if (view.id == '#tabstrip-login' || view.id == 'index.html#tabstrip-login') {
                e.preventDefault();
                navigator.app.exitApp();
            }
            app.globalViewModel.viewModel.goBack(e);
        }, false);
       
    }, false);

    app.changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        }
        else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);
    };
    
    document.addEventListener("offline", function () {
        navigator.notification.alert("offline");
    }, false);
    
    document.addEventListener("pause", function () {
        navigator.notification.alert("pause");
    }, false);
    
    document.addEventListener("resume", function () {
        navigator.notification.alert("resume");
    }, false);
})(window);