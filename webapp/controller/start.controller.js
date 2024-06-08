sap.ui.define([
    'grn/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("grn.controller.start",{
        onInit: function(){
            //Step 1: obtain the router object
            this.oRouter = this.getOwnerComponent().getRouter();    
            // BaseController.prototype.onInit.apply(this);      
        },
        onLogin: function(){
            this.oRouter.navTo("antman");            
        }
    });
});