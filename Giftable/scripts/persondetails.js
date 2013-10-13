var app = app || {};

(function(a) {
    function initialize(e) {
        var self = this;
        var personId = e.view.params.id;
        var persister = persisters.get();
        persister.users.friendDetails(personId)
        .then(function(data) {
            console.log(data);
            var viewModel = kendo.observable({
                id: data.id,
                username: data.username,
                email: data.email,
                checkInContacts: function() {
                    var options = new ContactFindOptions();
                    console.log(this.get("username"));
                    options.filter = this.get("username");
                    options.multiple = true;
                    var fields = ["displayName"];
                    
                    navigator.contacts.find(fields, function(data) {
                        //alert(JSON.stringify(data));
                        $("#person-matched-contacts").kendoMobileListView({
                            dataSource: data,
                            template: $("#matchedperson-template").html()
                        });
                    }, function(err) {
                        alert(err);
                    }
                    , options);
                }
            }
            );
            kendo.bind(e.view.element, viewModel);
        }, function(err) {
            console.log(err);
        })
    }
    
    /*function checkInContacts(){
    var searchedName = this.get(
        
    var fields = ["displayName", "name"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    }*/
    
    a.persondetails = {
        init: initialize
    }
}(app));