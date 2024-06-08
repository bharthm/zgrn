/*global XLSX*/
sap.ui.define([
    // 'grn/controller/BaseController',
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageBox',
    'sap/m/MessageToast',      
    'sap/ui/model/json/JSONModel', 
    'sap/m/Dialog',
    'sap/ui/unified/FileUploader'  
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox, MessageToast, JSONModel,Dialog,FileUploader) {
        "use strict";

        return Controller.extend("grn.controller.multi", {          
            onInit: function () {  
// 08.05.2024-start
            this.localModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.localModel, "localModel");
// 08.05.2024-end

                var obusyDelay, oModel = new JSONModel({
                    busy: true,
                    delay: 0,
                    data: []
                });
                debugger;
                sap.ui.getCore().setModel(oModel, "objectView");

                // BaseController.prototype.onInit.apply(this);                
                this._localModel = this.getOwnerComponent().getModel("local");
                debugger;                                                        
                this.oRouter = this.getOwnerComponent().getRouter(); 
                sap.ui.getCore().setModel(this._localModel);
                debugger;
                var ogetModel = sap.ui.getCore().getModel();
                ogetModel.setProperty("/local>/grnData/KUNRG",true);            
            },
            onUpload: function(e){  
                    debugger;              
                    this._import(e.getParameter("files") && e.getParameter("files")[0]);
                },
                _import: function (file) {
                    debugger;
                    var that = this;
                    var excelData = {};
                    if (file && window.FileReader) {
                        var reader = new FileReader();
                        reader.onload = function(e){
                            debugger;
                            var data = e.target.result;
                            var workbook = XLSX.read(data, {
                                type: 'binary'
                            });
                            workbook.SheetNames.forEach(function (sheetName) {
                                // Here is your object for every sheet in workbook
                                excelData = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        
                            });
                            // Setting the data to the local model 
                            that.localModel.setData({
                                items: excelData
                            });
                            that.localModel.refresh(true);
                        };
                        reader.onerror = function (ex) {
                            console.log(ex);
                        };
                        reader.readAsBinaryString(file);
                    }
                },                
            onExcel: function(){
                var that = this;
                debugger;
                this.fixedDialog = new Dialog({
                    title: "Upload",
                    beginButton : new sap.m.Button({
                        text:"Upload",
                        press: function(oEvent){
                          that.fixedDialog.close();
                        }

                    }),
                content: [
                    new FileUploader("excelUploader")
                ],
                endButton: new sap.m.Button({
                    text: "Cancel",
                    press: function(    ){
                        debugger;
                        that.fixedDialog.close();
                    }
                })
            });
            debugger;
            this.getView().addDependent(this.fixedDialog);
            this.fixedDialog.open();
            this.fixedDialog.attachBeforeClose(this.setDataToJsonFromExcel, this);
            },

            setDataToJsonFromExcel: function(oEvent){   
            debugger;                    
            var that = this;
            var oUploader = oEvent.getSource().getContent()[0];
            var oUploader = oEvent.getParameters("files").origin.oParent.oPopup.oContent.mAggregations.content[0].mProperties.value;
            var file = domRef.files[0];            
            var domRef = oUploader.getFocusDomRef();
            var file = domRef.files[0];            
            this.fileName = file.name;
            this.fileType = file.type;
            var reader = new FileReader();
            reader.onload = function(e){
                debugger;
            };
            reader.readAsDataURL(file);
            },
            onSave: function(){

                debugger; 
                var oVtval = this.getView().byId("cusid").getValue();
                var oCtval = this.getView().byId("macid").getValue();
                var oModel = this.getOwnerComponent().getModel();
                this._localModel.setProperty("/grnData/KUNRG",oVtval);     
                // this._localModel.setProperty("/grnData/",oCtval);         
                var oPayload = this._localModel.getProperty("/grnData");              
                oModel.create("/grndetailsSet", oPayload, {
                    success:function(){            
                        var msg = 'Updated successfully';                                                                 
                        MessageToast.show(msg);
                    }, 
                    error:function(oErr){
                        debugger;   
                        MessageBox.error(JSON.parse(oErr.responseText).error.innererror.errordetails[0].message);
                    }
                })
            },
            onRef : function(){
                debugger;
                var oModel = this.getOwnerComponent().getModel();
                oModel.refresh(true);
            }             
        });
    });
