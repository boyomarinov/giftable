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
        
        //get current user position in order to use it while adding a gift
        navigator.geolocation.getCurrentPosition(
                function (position) {
                    localStorage.setItem("latitudeNew", position.coords.latitude);
                    localStorage.setItem("longitudeNew", position.coords.longitude); 
                    localStorage.setItem("latitudeSuggest", position.coords.latitude);
                    localStorage.setItem("longitudeSuggest", position.coords.longitude);
                    
                    that.setGiftsOnMap();

                    that._isLoading = false;
                    that.hideLoading();
                },
                function (error) {
                    //default map coordinates                    
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that._isLoading = false;
                    that.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                                                 function () {
                                                 }, "Location failed", 'OK');
                },
                {
                timeout: 30000,
                enableHighAccuracy: true
            });
       
        var persister = persisters.get();
        
        //za Don4o
        (function() {
            if (persister.users.isLoggedIn()) {
                app.application.navigate("views/people.html#people-view");
                //console.log("logged in");
            }
            else {
                app.application.navigate("#login-view");
                //console.log("not logged in");
            }
        }()) 
        
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
        navigator.notification.alert("You do not have access to Internet. Try reconnecting again.");
    }, false);
    
    document.addEventListener("pause", function () {
        //navigator.notification.alert("pause");
    }, false);
    
    document.addEventListener("resume", function () {
        //navigator.notification.alert("resume");
    }, false);
})(window);