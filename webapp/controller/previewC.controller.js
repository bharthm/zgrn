sap.ui.define([
    'grn/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment',
    "sap/ui/core/date/UI5Date",
], function(BaseController, MessageBox, MessageToast, JSONModel, Fragment,UI5Date) {
    'use strict';
    return BaseController.extend("grn.controller.previewC",{
        
		_data : {
			dtValue: UI5Date.getInstance(),
			dtPattern: undefined
		},


        onInit: function(){
            BaseController.prototype.onInit.apply(this);
            this._localModel = this.getOwnerComponent().getModel("local");
			var oModel = new JSONModel(this._data);

			this.getView().setModel(oModel);
			// oModel.setProperty("/dtPattern",
			// 	this.getView().byId("dtInput").getBinding("value").getType().getPlaceholderText());
                
                
            this.oRouter = this.getOwnerComponent().getRouter();   
        },
        onRowSelect:function(){
            alert("Triggered");
        },        
        onApprove:function(oGift){

            debugger;
            oModel = this.getOwnerComponent().getModel("/newProduct");
            var oAprv = oGift.oSource.oPropagatedProperties.oBindingContexts.undefined.sPath;        
            oModel.getProperty(oAprv);
            oModel.setProperty("/newProduct",oAprv) 
            alert("Approved");
        }, 
        onReject:function(){
            alert("Rejected");
        },        
        onSave: function(){
        
            // var oVtval = this.getView().byId("myVtid").getSelectedItem().getText();
            // var oCtval = this.getView().byId("myCatid").getSelectedItem().getText();
            var oModel = this.getOwnerComponent().getModel();
            // this._localModel.setProperty("/newProduct/VendorType",oVtval);     
            // this._localModel.setProperty("/newProduct/Category",oCtval);         
            var oPayload = this._localModel.getProperty("/grnData");              
            oModel.create("/grndetailsSet", oPayload, {
                success: function(){
                    debugger;      
                    MessageToast.show("Updated successfully");
                }, 
                error: function(){
                    debugger;      
                    console.log(oErr);
                    MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
                }
            })
        }        
    });
});