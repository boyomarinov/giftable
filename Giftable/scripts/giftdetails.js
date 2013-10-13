var app = app || {};

(function(a) {
    function initialize(e) {
        var self = this;
        var itemId = e.view.params.id;
        var persister = persisters.get("http://localhost:30765/api/");
        persister.gifts.getGiftDetails(itemId)
        .then(function(data) {
            /*$("#gift-details-info").html(JSON.stringify(data));*/
            $("#giftdetails-image > img").attr("src", "data:image/jpeg;base64," + data.image);
            var viewModel = kendo.observable({
                id: data.id,
                name: data.name,
                description: data.description,
                latitude: data.latitude,
                longitude: data.longitude,
                url: data.url
            })
            kendo.bind(e.view.element, viewModel);
        }, function(err) {
            console.log(err);
        })
    }
    
    a.giftdetails = {
        init: initialize
    }
}(app));