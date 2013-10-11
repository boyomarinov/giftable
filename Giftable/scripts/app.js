(function (global) {
    var mobileSkin = "",
    app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        app.application = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
        
        //if (device.platform == 'Android') {
            //document.getElementById("backButton").style.visibility = "hidden";
        //}

        document.addEventListener("backbutton", function (e) {
            var view = app.application.view();
            navigator.notification.alert(view.id);
            if (view.id == '#tabstrip-login' || view.id == 'index.html#tabstrip-login') {
                e.preventDefault();
                navigator.app.exitApp();
            }
            app.globalViewModel.viewModel.goBack(e);
        }, false);
        
        /*var onDetected = function() {
            navigator.notification.vibrate(300);
            app.application.navigate("pages/feedbackPage/feedbackPage.html#feedbackPage-page")
            navigator.notification.alert("shake it baby!");
        }
        shake.startWatch(onDetected);*/
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