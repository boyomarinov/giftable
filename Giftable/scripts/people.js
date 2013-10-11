(function(global) {  
    var PeopleViewModel,
        app = global.app = global.app || {};
    
    PeopleViewModel = kendo.data.ObservableObject.extend({
        peopleDataSource: null,
        
        init: function () {
            var self = this,
                dataSource;
            
            kendo.data.ObservableObject.fn.init.apply(self, []);
            
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "data/people.json",
                        dataType: "json"
                    }
                }
            });
            
            self.set("peopleDataSource", dataSource);           
        }        
    });  
    
    app.peopleService = {
        viewModel: new PeopleViewModel()
    };
})(window);