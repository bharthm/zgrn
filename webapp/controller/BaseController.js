sap.ui.define([
    'sap/ui/core/mvc/Controller',    
], function(Controller) {
    'use strict';
    return Controller.extend("grn.controller.BaseController",{
        //global variable in base controller available in all child controllers        
        reuseCode: function(){
            
        },
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();  
        }
    });
});