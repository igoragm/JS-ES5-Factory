Global.CustomersModule = Object.create({
    _init: function() {
        var self = this;
        
        self.init();
    },
    
    init: function() {
        var self = this;
        
        // The purpose of the tableId is to, if need be, retrieve the table later from the TableFactory
        this.tableId = Global.TableFactory.registerTable(self.tableOptions());
    },
    
    tableOptions: function() {
		var self = this;

		return {
			tableName: 'CustomersModule_table',
			container: 'A place in the DOM where you want the table attached',
			header: 'CustomersModule table headers',
			autoselectFirst: true,
			rowClick: function(tr) {
				console.log('CustomersModule row click!');
			},
			pageSize: 10,
			localTable: true,
		};
	},
})