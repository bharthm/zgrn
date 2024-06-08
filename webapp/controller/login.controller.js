sap.ui.define([
    'grn/controller/BaseController','sap/m/MessageBox'
], function(BaseController,MessageBox) {
return BaseController.extend("grn.controller.login",{
    onInit:function(){
        BaseController.prototype.onInit.apply(this);
    },
    onLogin: function(){
        var oName = this.getView().byId("un");
        var oPasw = this.getView().byId("pw");

        var sName = oName.getValue();
        var sPasw = oPasw.getValue();

        if ( sName === "" || sPasw === "" ){
            // alert("Please Enter atleast one value");
            MessageBox.show("Please Enter both username / password.",{
                icon: MessageBox.Icon.INFORMATION,  
                title: "TVS Next",
            });
            return;
        }
        if ( sPasw === sName ){
        this.oRouter.navTo("Main");
        }else {
            // alert("Incorrect User Name and Password");
            MessageBox.show("Incorrect User Name and Password",{
                icon: MessageBox.Icon.ERROR,
                title: "TVS Next",
            });
            return;            
        }
    }
});
});