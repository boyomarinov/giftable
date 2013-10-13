(function (global) {
    var map,
    geocoder,
    LocationViewModel,
    app = global.app = global.app || {},
    persister = persisters.get();

    LocationViewModel = kendo.data.ObservableObject.extend({
        _lastMarker: null,
        _isLoading: false,
        address: "",

        onNavigateHome: function () {
            var that = this,
            position;

            that._isLoading = true;
            that.showLoading();

            navigator.geolocation.getCurrentPosition(
                function (position) {
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    map.panTo(position);
                    that._putMarker(position);
                    
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
            }
                );
        },

        onSearchAddress: function () {
            var that = this;

            geocoder.geocode(
                {
                'address': that.get("address")
            },
                function (results, status) {
                    if (status !== google.maps.GeocoderStatus.OK) {
                        navigator.notification.alert("Unable to find address.",
                                                     function () {
                                                     }, "Search failed", 'OK');

                        return;
                    }

                    map.panTo(results[0].geometry.location);
                    that._putMarker(results[0].geometry.location);
                });
        },

        showLoading: function () {
            if (this._isLoading) {
                app.application.showLoading();
            }
        },

        hideLoading: function () {
            app.application.hideLoading();
        },

        _putMarker: function (position) {
            var that = this;

            if (that._lastMarker !== null && that._lastMarker !== undefined) {
                that._lastMarker.setMap(null);
            }

            that._lastMarker = new google.maps.Marker({
                map: map,
                position: position
            });
        },
        
        myPutMarker: function(gift) {
            var self = this;
            
            
            var contentString = "<h3>" + gift.name + "</h3>" + 
                                "<div>" + gift.description + "</div>" + 
                                "<div>Latitude: " + gift.latitude + "</div><div>Longitude: " + gift.longitude + "</div>" + 
                                "<div><a href=\"" + gift.url + "\">Link</a></div>"
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            
            var currPosition = new google.maps.LatLng(gift.latitude, gift.longitude);
            
            var marker = new google.maps.Marker({
                position: currPosition,
                map: map,
                title: "bla"
            });
            
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map, marker);
            });
        },
        
        setGiftsOnMap: function() {
            var self = this;
            persister.gifts.getLocatedGifts()
            .then(function(data) {
                for (var i = 0; i < data.length; i++) {
                    self.myPutMarker(data[i]);
                }
            }, function(err) {
                console.log(err);
            });
        }
    });

    app.locationService = {
        initLocation: function () {
            var mapOptions = {
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
    
                mapTypeControl: false,
                streetViewControl: false
            };

            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);            
            geocoder = new google.maps.Geocoder();
            app.locationService.viewModel.onNavigateHome.apply(app.locationService.viewModel, []);
        },

        show: function () {
            //show loading mask in case the location is not loaded yet 
            //and the user returns to the same tab
            app.locationService.viewModel.showLoading();
            
            //resize the map in case the orientation has been changed while showing other tab
            google.maps.event.trigger(map, "resize");
        },

        hide: function () {
            //hide loading mask if user changed the tab as it is only relevant to location tab
            app.locationService.viewModel.hideLoading();
        },

        viewModel: new LocationViewModel()
    };
}
)(window);