(function (global) {
    //var persister = persisters.get("http://giftable.apphb.com/api/")
    var persister = persisters.get("http://localhost:30765/api/");
    var NewGiftViewModel,
    app = global.app = global.app || {};

    NewGiftViewModel = kendo.data.ObservableObject.extend({
       
        titleNew: "",
        descriptionNew: "",
        latitudeNew: "",
        longitudeNew: "",
        imageNew: "",
        urlNew: "",
        
        titleSuggest: "",
        descriptionSuggest: "",
        latitudeSuggest: "",
        longitudeSuggest: "",
        imageSuggest: "",
        urlSuggest: "",
        suggestedFor: "",
        
        add: function () {
            var self = this;
            var title = self.get("titleNew").trim();
            var description = self.get("descriptionNew").trim();
            var latitude = self.get("latitudeNew").trim();
            var longitude = self.get("longitudeNew").trim();
            var image = self.get("imageNew").trim();
            var url = self.get("urlNew").trim();

            if (title === "") {
                navigator.notification.vibrate(100);
                navigator.notification.alert("Title is required!",
                                             function () {
                                             }, "Login failed", 'OK');

                return;
            }
            
            if (isNaN(latitude) || isNaN(longitude)) {
                navigator.notification.vibrate(100);
                navigator.notification.alert("Coordinates are invalid",
                                             function () {
                                             }, "Gift suggestion failed", 'OK');

                return;
            }
            
            persister.gifts.newGift(title, description, latitude, longitude, image, url)
            .then(function() {
                //app.application.navigate("views/wishlist.html#wishlist-view");
                console.log("Successfully added");
            }, function(err) {
                console.log(err);
            });
        },
        
        suggest: function () {
            var self = this;
            var title = self.get("titleSuggest").trim();
            var description = self.get("descriptionSuggest").trim();
            var latitude = self.get("latitudeSuggest").trim();
            var longitude = self.get("longitudeSuggest").trim();
            var image = self.get("imageSuggest").trim();
            var url = self.get("urlSuggest").trim();
            var suggestedBy = localStorage.getItem('username');
            var suggestedFor = self.get("suggestedFor").trim();

            if (title === "") {
                navigator.notification.vibrate(100);
                navigator.notification.alert("Title is required!",
                                             function () {
                                             }, "Login failed", 'OK');

                return;
            }
            
            if (isNaN(latitude) || isNaN(longitude)) {
                navigator.notification.vibrate(100);
                navigator.notification.alert("Coordinates are invalid",
                                             function () {
                                             }, "Gift suggestion failed", 'OK');

                return;
            }
            
            persister.gifts.suggestGift(title, description, latitude, longitude, image, url, suggestedBy, suggestedFor)
            .then(function() {
                app.application.navigate("views/wishlist.html#wishlist-view");
            }, function(err) {
                console.log(err);
            });
        },
        
        capturePhotoForNew: function() {
            var self = this;
            navigator.camera.getPicture(function(data) {
                self.set("imageNew", data);
                $("#image-preview-new").attr("src", "data:image/jpeg;base64," + data);
                $("#image-preview-new").attr("height", 150);
            }, function(err) {
                console.log(err);
            }, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });
        },
        capturePhotoForSuggest: function() {
            var self = this;
            navigator.camera.getPicture(function(data) {
                self.set("imageSuggest", data);
                $("#image-preview-suggest").attr("src", "data:image/jpeg;base64," + data);
                $("#image-preview-suggest").attr("height", 150);
            }, function(err) {
                console.log(err);
            }, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });
        }
    });

    app.NewGiftViewModel = {
        viewModel: new NewGiftViewModel()
    };
})(window);