Global.CrewModule = Object.create({
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
			tableName: 'CrewModule_table',
			container: 'A place in the DOM where you want the table attached',
			rowAttributes: function() {
                console.log('CrewModule rowAttributes called')   
            },
			header: {},
			rowDblClick: function(tr) {
                console.log('A double-click from CrewModule occured!')
			},
			getTableParams: function() {
				console.log('CrewModule getTableParams called')
			},
			pageSize: 10,
		};
	},
})