Global.TableFactory = Object.create({
    _init: function() {
        var self = this;
		
		// define here whatever default properties you need
		// they, as well as pretty much every method here, are overrideable
        self.tables = {};
		self.container = {};
		self.rowAttributes = [];
		self.header = [];
		self.tableName = 'No name';
		self.autoselectFirst = false;
		self.pageSize = 0;
		self.tables = {}; 
    },
    
    registerTable: function(options) {
		var self = this,
			prototype = self._overrideBaseOptions(options);

		// Defining a tableId property on the prototype object
		Object.defineProperty(prototype, 'tableId', {
			value: $.now(), // the ID that will later be used to retrieve a specific instance
			configurable: false,
			writeable: false,
			enumerable: true,
		});

        /* 
            After 'this' and 'this.__proto__' are combined, a new object is created and I've named it simply 'prototype'.
            Now, if you inspect 'prototype' and compare it with its "parent" objects you will notice that the original functionality of the TableFactory
            is preserved and can be accessed simply through 'this' but the new/extended functionality is contained within 'prototype' and the rest of 
            the execution is on the 'prototype'.
            
            Check the console log bellow:
        */
		
        console.log(this.tableName);
		console.log(prototype.tableName);
		// Notice the difference? this.tableName will still be 'No name' as defined in the _init. prototype.tableName on the other hand will be whatever name was passed at the init of a new object.
		
		var table = prototype._initTableGrid();

		var tableInstance = {
			table: table,
			__proto__: prototype,
		};

		// Adding a new instance to collection of tables so that it can be retrieved later and if necessary manually disposed 
		Object.defineProperty(self.tables, prototype.tableId, {
			value: tableInstance,
			configurable: true,
			enumerable: true,
		});

		return prototype.tableId;
	},

    /*
    The purpose of this method is to extend the table with module-specific options. 
    Keep in mind that only one instance of the TableFactory exists within the Global namespace and with this I've enabled
    this single instance to be extendable. 
    */
	_overrideBaseOptions: function(options) {
		var protoThis = Object.getPrototypeOf(this),
			prototype = $.extend(true, {}, this, protoThis);

		/* Overrides TableFactory 'this' + 'this.__proto__' 
           I have limited this method to 2 levels: 'this' (gets created when '_init' is called and contains only the properties found within the scope of '_init' such as tableName, autoSelectFirst, etc.) and
           'this.__proto__' which contains every property of the TableFactory object.
        */
        
		for (var baseProperty in prototype) {
			for (var extendedProperty in options) {
				if (prototype.hasOwnProperty(baseProperty)) {
					if (baseProperty === extendedProperty) {
						prototype[baseProperty] = options[extendedProperty];
					}
				}
			}

			if (typeof prototype[baseProperty] === 'function') {
				prototype[baseProperty].bind(prototype);
			}
		}

		return prototype;
	},
    
    _initTableGrid: function() {
        var self = this;
        
        self.rowClick();
        self.rowDblClick();
        self.rowAttributes();
        self.getTableParams();
    },

    // Override me if necessary
    rowClick: function() {
        console.log('Base rowClick behaviour')
    },
    
    // Override me if necessary
    rowDblClick: function() {
        console.log('Base rowDblClick behaviour')
    },
    
    // Override me if necessary
    rowAttributes: function() {
        console.log('Base rowAttributes behaviour')
    },
    
    // Override me if necessary
    getTableParams: function() {
        console.log('Base getTableParams behaviour')
    },
})