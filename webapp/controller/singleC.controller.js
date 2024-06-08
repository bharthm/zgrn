sap.ui.define([
    'grn/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/Fragment',
    'sap/ui/model/odata/type/DateTimeWithTimezone', 
    "sap/ui/core/date/UI5Date",   
], function(BaseController, MessageBox, MessageToast, JSONModel, Fragment,DateTimeWithTimezone,UI5Date) {
    'use strict';
    return BaseController.extend("grn.controller.singleC",{
		_data : {
			dtValue: UI5Date.getInstance(),
			dtPattern: undefined
		},

        onInit: function(){
            var oModel = new JSONModel(this._data);         
            this.oRouter = this.getOwnerComponent().getRouter(); 

            this.getView().setModel(oModel);         
                                      
        },
        onChange: function(){
            debugger;            
            // var v_shift = this.getView().byId("shifid").getSelectedItem().mProperties.key;
            // if(v_shift =='1' ){
            //     var startTime = '06:00:00';
            //     var endTime = '14:00:00';
            // }
            // if(v_shift == '2' ){

            //     var startTime = '14:00:00';
            //     var endTime = '22:00:00';

            //     debugger;
            //     // if (sTimeValue >= '14:00:00' && sTimeValue <= '22:00:00'){
                
            //     // }else{
            //     //     MessageBox.error('Wrong Shift');
            //     // }
            // }
            // if(v_shift == '3' ){
            //     var startTime = '22:00:00';
            //     var endTime = '06:00:00';                
            //     debugger; 
            //     // if (sTimeValue < '22:00:00'){
            //     //     MessageBox.error('Wrong Shift');
            //     // }                
            // }
           
            // var dt = new Date();//current Date that gives us current Time also
            
            // var s =  startTime.split(':');
            // var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            //                    parseInt(s[0]), parseInt(s[1]), parseInt(s[2]));
            
            // var e =  endTime.split(':');
            // var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            //                    dt.getDate(),parseInt(e[0]), parseInt(e[1]), parseInt(e[2]));
            
            // alert( (dt >= dt1 && dt <= dt2) ? 'Current time is between startTime and endTime' : 
            //                                   'Current time is NOT between startTime and endTime');
            // // alert ('dt = ' + dt  + ',  dt1 = ' + dt1 + ', dt2 =' + dt2)            

        }
    });
});