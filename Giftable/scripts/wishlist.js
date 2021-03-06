var app = app || {};

(function(a) {
    function init(e) {
        var persister = persisters.get();
        
        persister.gifts.wishlist()
        .then(function(data) {
            console.log(data);
            $("#custom-wishlist-listview").kendoMobileListView({
                dataSource: data,
                template: $("#wishlist-list-template").html()
            });
        }, function(error) {
            console.log(error);
        })
    }   
    
    a.wishlist = {
        init:init          
    };
}(app));