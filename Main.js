(function() {
    Global.TableFactory = Object.create(Global.TableFactory);
    Global.TableFactory._init();
    
    var CustomersModule = Object.create(Global.CustomersModule);
    CustomersModule._init();
    
    var CrewModule = Object.create(Global.CrewModule);
    CrewModule._init();
})()