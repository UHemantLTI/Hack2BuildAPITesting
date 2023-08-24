sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("com.fileupload.apitesting.controller.FileUpload", {
            onInit: function () {

            },
            handleUploadPress: function () {
                var oFileUploader = this.byId("fileUploader");
                oFileUploader.checkFileReadable().then(function () {
                    oFileUploader.upload();
                }, function (error) {
                    MessageToast.show("The file cannot be read. It may have changed.");
                }).then(function () {
                    oFileUploader.clear();
                });
                this.uploadData(oFileUploader.FUEl.files[0]);
            },
            uploadData: function (excelData) {
                var form = new FormData();
                form.append("file", excelData, "");
                var sUrl = this.getOwnerComponent().getModel("digital").sServiceUrl;
                jQuery.ajax({
                    url: sUrl + "/test_get",
                    type: "GET",
                    // contentType: excelData.type,
                    // processData: false,
                    // cache: false,
                    // async: false,
                    headers: {
                        "Authorization": "Basic bHRpbWluZHRyZWU6QVNEcXdlIUAjMTIz"
                    },
                    // data: form,
                    // mimeType: "multipart/form-data",
                    contentType: "application/json; charset=utf-8",
                    
                    success: function (oData) {
                        MessageBox.show(oData);
                    },
                    error: function (e) {
                        MessageBox.error(e.responseText);
                    },
                });



            }

        });
    });
